import { type FC, useState } from 'react';
import styles from './SortBy.module.scss';
import clsx from 'clsx';
import { useAppDispatch } from '@/app/store/hooks/redux';
import { changeSortBy } from '@/app/store/category/categorySlice';
import { SortByType } from '@/app/store/category/interface';

export const SortBy: FC = () => {
  const dispatch = useAppDispatch();
  const [currentSort, setCurrentSort] = useState(true);

  const toggleSort = (value: SortByType): void => {
    dispatch(changeSortBy(value));
    setCurrentSort(!currentSort);
  };

  return (
    <div className={styles.main}>
      <div
        onClick={() => {
          toggleSort(SortByType.FRESH);
        }}
        className={clsx(styles.sort_fresh, { [styles.active]: !currentSort })}>
        {'Свежее'}
      </div>
      <div
        onClick={() => {
          toggleSort(SortByType.POPULAR);
        }}
        className={clsx(styles.sort_popular, { [styles.active]: currentSort })}>
        {'Популярное'}
      </div>
    </div>
  );
};
