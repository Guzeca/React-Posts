import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Image from '../../shared/Icons/SadCat.png';
import { Button, ButtonTheme } from '@/shared/Ui/Button/Button';

import style from './Fullcard.module.scss';

export const FullCard: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const title = t('Название') + ' ' + String(id);

  return (
    <div className={style.main_content}>
      <Link to={'/block'}>
        <Button theme={ButtonTheme.SQUARE}>{t('Назад')}</Button>
      </Link>
      <div>
        <img src={Image} width={1760} height={800} alt="image" />
      </div>
      <div className={style.desc}>
        <div className={style.text}>
          <p>{t('Описание')}</p>
        </div>
        <div>stars</div>
        <div>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};
