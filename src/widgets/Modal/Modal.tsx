import { type FC, useState, type ChangeEvent, type MouseEvent } from 'react';
import Modal from 'react-modal';
import { ReactComponent as Clear } from '@/shared/Icons/clear.svg';
import styles from './Modal.module.scss';
import { useGetCategoriesQuery } from '@/app/store/category/categoryAPI';
import { useCreatePostMutation } from '@/app/store/posts/postAPI';
import { type IPosts } from '@/app/store/posts/interface';
import clsx from 'clsx';
import { useTheme } from '@/app/providers/ThemeProvider';

Modal.setAppElement('#root');

export const ModalWindow: FC = () => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState('');
  const [filePreview, setFilePreview] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);

  const { data: categories } = useGetCategoriesQuery();
  const [createPost, { isError, isSuccess }] = useCreatePostMutation();

  const clearPostStates = (): void => {
    setImageUrl('');
    setFilePreview(null);
    setTags([]);
    setDescription('');
    setTitle('');
  };

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    if (imageUrl || tags.length > 0 || description || title) {
      if (confirm('Вы точно хотите выйти?')) {
        clearPostStates();
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  }

  const onClickClearUrl = (): void => {
    setImageUrl('');
    setFilePreview(null);
  };

  const onClickCategory = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const target = event.target as any;
    if (target) {
      const tagsArray = [...tags, target.innerText];
      setTags([...new Set(tagsArray)]);
      if (target.style.backgroundColor === 'rgb(24, 233, 94)') {
        target.style.backgroundColor = '';
      } else {
        target.style.backgroundColor = 'rgb(24, 233, 94)';
      }
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    setImageUrl(target.value);
    setFilePreview(target.value);
  };

  const handleInputDescChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const target = event.target;
    setDescription(target.value);
  };

  const handleInputTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    setTitle(target.value);
  };

  const handleCreate = async (): Promise<void> => {
    const date = new Date().toISOString();

    const data = {
      title,
      description,
      creationAt: date,
      images: imageUrl,
      category: [...tags],
      rating: 0,
      ratingArr: []
    };
    await createPost(data as IPosts);
    if (isSuccess) {
      alert('Статья создана');
      setIsOpen(false);
    } else if (isError) {
      alert('Что-то пошло не так');
    }
  };

  return (
    <div>
      <button className={styles.create} onClick={openModal}>
        Create Post
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className={styles.modal}
        overlayClassName={clsx(styles.overlay, theme)}>
        <form>
          <label className={styles.title}>
            <p>Заголовок</p>
            <input onChange={handleInputTitleChange} type="text" />
          </label>
          <label className={styles.load__image}>
            <div>
              <p>Введите URL изображения</p>
              <div className={styles.load__image_url}>
                <input
                  onChange={handleFileInputChange}
                  className={styles.input_img}
                  type="text"
                  value={imageUrl}
                />
                <Clear onClick={onClickClearUrl} className={styles.clearUrl} />
              </div>
            </div>
            {filePreview ? (
              <img src={filePreview} alt="preview" width={300} height={250} />
            ) : (
              <div className={styles.imageField}>{'Предпросмотр изображения'}</div>
            )}
          </label>
          <div className={styles.load__categories}>
            <p>Выберите теги</p>
            <div className={styles.categories}>
              {categories?.map((item) => (
                <button onClick={onClickCategory} className={styles.category} key={item.id}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <label className={styles.text_label}>
            <textarea
              onChange={handleInputDescChange}
              className={styles.area}
              name="Описание"
              cols={100}
              rows={10}></textarea>
          </label>
          <button
            className={styles.create_post}
            onClick={() => {
              void handleCreate();
            }}
            type="button">
            Добавить
          </button>
        </form>
        <Clear className={styles.close} onClick={closeModal} />
      </Modal>
    </div>
  );
};
