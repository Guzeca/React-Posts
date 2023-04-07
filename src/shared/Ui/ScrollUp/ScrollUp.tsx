import { ReactComponent as Arrow } from '@/shared/Icons/up-arrow.svg';
import { type FC } from 'react';

import styles from './ScrollUp.module.scss';

export const ScrollUp: FC = () => {
  const onClickArrow = (): void => {
    const ref = document.getElementById('ref');
    ref?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.main}>
      <Arrow onClick={onClickArrow} />
    </div>
  );
};
