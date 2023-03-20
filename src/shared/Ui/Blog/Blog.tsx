import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import Image from '../../Icons/SadCat.png';
import styles from './Blog.module.scss';
import { Stars } from '../Stars/Stars';
import { Button, ButtonTheme } from '../Button/Button';
import { Link } from 'react-router-dom';

interface BlogProps {
  title: number;
}

export const Blog: FC<BlogProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <div>
        <img src={Image} alt="image" />
      </div>
      <div className={styles.desc}>
        <div className={styles.text}>
          <h3>{t(`Какое-то заглавие ${title + 1}`)}</h3>
        </div>
        <div className={styles.info}>
          <Stars />
          <Link to={`/blog/article/${title + 1}`}>
            <Button className={styles.button} theme={ButtonTheme.CLEAR}>
              {t('Подробнее')}
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.comments}>{t('Какой-то комментарий')}</div>
    </div>
  );
};
