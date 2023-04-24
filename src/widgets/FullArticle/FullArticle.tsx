import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/shared/Ui/Button/Button';
import {
  useGetOnePostQuery,
  useUpdateCommentMutation,
  useUpdatePostMutation
} from '@/app/store/posts/postAPI';

import styles from './FullArticle.module.scss';
import { StarsForFullArticle } from '@/shared/Ui/Stars/StarsForFullArticle';
import { type IPosts } from '@/app/store/posts/interface';
import { UserCommentForFullArticle } from '@/shared/Ui/UserComment/UserCommentForFullArticle';

export const FullPost: FC = () => {
  const { t } = useTranslation();
  const { title } = useParams();
  const id = title?.match(/[0-9]+$/g)?.join() ?? '';

  const { data, isLoading, error } = useGetOnePostQuery(id);
  const post = data && data[0];

  const [updatePost] = useUpdatePostMutation();
  const [updateComments] = useUpdateCommentMutation();

  const handleUpdate = (data: IPosts): void => {
    updatePost(data);
  };

  const handleUpdateComment = (post: IPosts): void => {
    updateComments(post);
  };

  return (
    <div className={styles.main_content}>
      <Link to={'/blog'}>
        <Button className={styles.back}>{t('Назад')}</Button>
      </Link>
      {isLoading ? (
        <div>{'Загрузка'}</div>
      ) : error ? (
        <div>{'Ошибка'}</div>
      ) : (
        post && (
          <div className={styles.article}>
            <div className={styles.image}>
              <img src={post.images} alt="image" />
            </div>
            <div className={styles.title}>
              <h2>{post.title}</h2>
            </div>
            <div className={styles.tags}>
              {post.category.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className={styles.author}>
              <Link to={'/blog/articles/authors/author'}>{t('Автор')}</Link>
            </div>
            <div className={styles.desc}>
              <p>{post.description}</p>
            </div>
            <div>
              <StarsForFullArticle update={handleUpdate} post={post} />
            </div>
            <div className={styles.text}>
              <p>Комментарии:</p>
              <div className={styles.comments}>
                <UserCommentForFullArticle
                  post={post}
                  updateHelpful={handleUpdateComment}
                  comments={post.comments}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
