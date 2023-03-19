import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/Ui/Card/Card';
import style from './BlockPage.module.scss';
import { Link } from 'react-router-dom';

export const BlockPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={style.main_content}>
      {t('Это блок')}
      <div className={style.cards}>
        {[...Array(8)].map((_, index) => (
          <Link to={`/block/${index + 1}`} key={index}>
            <Card />
          </Link>
        ))}
      </div>
    </div>
  );
};
