import { useState, type FC, useRef } from 'react';
import styles from './SortBy.module.scss';
import { useOnClickOutside } from '@/shared/hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/redux';
import { SortByType, changeSortBy } from '@/app/store/category/categorySlice';

const sortByArr = ['Свежее', 'Популярное'];

export const SortBy: FC = () => {
  const { sortBy } = useAppSelector((state) => state.categoryId);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggleSort = (value: SortByType): void => {
    dispatch(changeSortBy(value));
  };

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <div ref={ref} className={styles.main}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={styles.title}>
        {sortBy}
        {open && (
          <ul className={styles.list}>
            {sortByArr.map((item) => (
              <li
                onClick={() => {
                  toggleSort(sortBy === SortByType.POPULAR ? SortByType.FRESH : SortByType.POPULAR);
                }}
                key={item}
                className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
