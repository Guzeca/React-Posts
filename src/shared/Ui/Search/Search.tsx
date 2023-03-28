import { type FC } from 'react';
import { ReactComponent as Find } from '@/shared/Icons/search.svg';
import styles from './Search.module.scss';

export const Search: FC = () => {
  return (
    <div className={styles.search}>
      <input className={styles.input} type="text" placeholder="Поиск..." />
      <Find className={styles.find} />
    </div>
  );
};
