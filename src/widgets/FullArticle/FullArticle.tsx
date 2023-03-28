import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, ButtonTheme } from '@/shared/Ui/Button/Button';
import { UserComment } from '@/shared/Ui/UserComment/UserComment';
import { useGetOnePostQuery } from '@/app/store/product/postAPI';
import { Stars } from '@/shared/Ui/Stars/Stars';

import styles from './FullArticle.module.scss';

export const FullPost: FC = () => {
  const { t } = useTranslation();
  const { title } = useParams();
  const id = Number(title?.match(/[0-9]+$/g)?.join());

  const { data, isLoading, error } = useGetOnePostQuery(id);

  return (
    <div className={styles.main_content}>
      <Link to={'/blog'}>
        <Button theme={ButtonTheme.SQUARE}>{t('Назад')}</Button>
      </Link>
      {isLoading ? (
        <div>{'Загрузка'}</div>
      ) : error ? (
        <div>{'Ошибка'}</div>
      ) : (
        <div className={styles.article}>
          <div className={styles.image}>
            <img src={data?.images[0]} alt="image" />
          </div>
          <div className={styles.title}>
            <h2>{data?.title}</h2>
          </div>
          <div className={styles.tags}>{data?.category?.name}</div>
          <div className={styles.author}>
            <Link to={'/blog/articles/authors/author'}>{t('Автор')}</Link>
          </div>
          <div className={styles.desc}>
            <p>{data?.description}</p>
          </div>
          <div>
            <Stars />
          </div>
          <div>
            <p>Комментарии:</p>
            <div className={styles.comments}>
              <UserComment />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
