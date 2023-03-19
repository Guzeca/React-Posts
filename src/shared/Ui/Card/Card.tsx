import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Delete } from '@/shared/Icons/delete.svg';
import { ReactComponent as Edit } from '@/shared/Icons/edit.svg';
import { ReactComponent as Complete } from '@/shared/Icons/complete.svg';
import Image from '../../Icons/SadCat.png';

import style from './Card.module.scss';

export const Card: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={style.card}>
      <div>
        <img className={style.card_image} width={330} height={200} src={Image} alt="image" />
      </div>
      <div>
        <h3>{t('Название')}</h3>
        <p>{t('Описание')}</p>
      </div>
      <div className={style.card_options}>
        <div className={style.card_change}>
          <Delete />
          <Edit />
        </div>
        <div>
          <Complete />
        </div>
      </div>
    </div>
  );
};
