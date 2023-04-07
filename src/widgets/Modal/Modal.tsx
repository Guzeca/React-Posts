import { type FC, useState, type ChangeEvent } from 'react';
import Modal from 'react-modal';
import { ReactComponent as Clear } from '@/shared/Icons/clear.svg';
import styles from './Modal.module.scss';
import { useGetCategoriesQuery } from '@/app/store/category/categoryAPI';
import { useCreatePostMutation } from '@/app/store/posts/postAPI';
import { type IPosts } from '@/app/store/posts/interface';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export const ModalWindow: FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [filePreview, setFilePreview] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);

  const { data: categories } = useGetCategoriesQuery();
  const [createPost] = useCreatePostMutation();

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
    if (confirm('Вы хотите сохранить содержимое?')) {
      clearPostStates();
    }
    setIsOpen(false);
  }

  const onClickCategory = (event: any): void => {
    event.preventDefault();
    const target = event.target;
    if (target) {
      const tagsArray = [...tags, target.innerText];
      setTags(tagsArray);
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
      rating: 700
    };
    await createPost(data as IPosts);
    alert('Статья создана');
    setIsOpen(false);
  };

  return (
    <div>
      <button className={styles.create} onClick={openModal}>
        Create Post
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal">
        <form>
          <label>
            <p>Заголовок</p>
            <input onChange={handleInputTitleChange} type="text" className={styles.title} />
          </label>
          <label className={styles.load__image}>
            <div>
              <p>Введите URL изображения</p>
              <input onChange={handleFileInputChange} className={styles.input} type="text" />
            </div>
            {filePreview && <img src={filePreview} alt="preview" width={300} height={300} />}
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
          <label>
            <textarea
              onChange={handleInputDescChange}
              className={styles.area}
              name="Описание"
              cols={100}
              rows={10}></textarea>
          </label>
          <button
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
