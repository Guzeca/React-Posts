import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Image from '../../shared/Icons/SadCat.png';
import { Button, ButtonTheme } from '@/shared/Ui/Button/Button';

import styles from './FullArticle.module.scss';
import { Stars } from '@/shared/Ui/Stars/Stars';
import { UserComment } from '@/shared/Ui/UserComment/UserComment';

const tagsArray = ['Technology', 'C++', 'Java', 'HTML'];

export const FullCard: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const title = t('Название') + ' ' + String(id);
  const tags = tagsArray.map((item) => (
    <Link key={item} to={`/blog/articles/tags/${item}`}>
      {`#${item}`}
    </Link>
  ));

  return (
    <div className={styles.main_content}>
      <Link to={'/blog'}>
        <Button theme={ButtonTheme.SQUARE}>{t('Назад')}</Button>
      </Link>
      <div className={styles.article}>
        <div className={styles.image}>
          <img src={Image} alt="image" />
        </div>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        <div className={styles.tags}>{tags}</div>
        <div className={styles.author}>
          <Link to={'/blog/articles/authors/author'}>{t('Автор')}</Link>
        </div>
        <div className={styles.desc}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, sapiente natus!
            Deserunt totam numquam quibusdam accusantium molestias adipisci dolore eum consectetur?
            Perspiciatis in repudiandae iusto assumenda beatae inventore provident magnam.
          </p>
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
    </div>
  );
};
