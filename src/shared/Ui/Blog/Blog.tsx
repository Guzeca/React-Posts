import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Blog.module.scss';
import { Button, ButtonTheme } from '../Button/Button';
import { Link } from 'react-router-dom';
import { type IPosts } from '@/app/store/posts/interface';
import { UserComment } from '../UserComment/UserComment';
import { StarsForPosts } from '../Stars/StarsForPosts';

export const Blog: FC<IPosts> = ({ title, images, id, rating, creationAt = '', comments }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <div>
        <img src={images} alt="image" className={styles.image} />
      </div>
      <div className={styles.desc}>
        <div className={styles.text}>
          <h3>{title}</h3>
        </div>
        <div className={styles.info}>
          <StarsForPosts rating={rating} />
          <Link to={`/blog/article/${title}_${id}`}>
            <Button className={styles.button} theme={ButtonTheme.CLEAR}>
              {t('Подробнее')}
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.comments}>{<UserComment value={comments} />}</div>
      {creationAt}
    </div>
  );
};
