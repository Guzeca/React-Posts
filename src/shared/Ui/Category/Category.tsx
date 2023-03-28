import { useState, type FC, useRef } from 'react';
import styles from './Category.module.scss';
import { useGetCategoriesQuery } from '@/app/store/category/categoryAPI';
import { useOnClickOutside } from '@/shared/hooks/useClickOutside';
import { useAppDispatch } from '@/app/store/hooks/redux';
import { changeCategoryId } from '@/app/store/category/categorySlice';

export const Category: FC = () => {
  const [category, setCategory] = useState('Все категории');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const { data } = useGetCategoriesQuery();

  const changeCategory = (item: string, id: number): void => {
    setCategory(item);
    setOpen(false);
    dispatch(changeCategoryId(id));
  };

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <div className={styles.main}>
      <div
        ref={ref}
        className={styles.title}
        onClick={() => {
          setOpen(!open);
        }}>
        {category}
        {open && (
          <ul className={styles.list}>
            {category !== 'Все категории' ? (
              <li
                onClick={() => {
                  changeCategory('Все категории', 0);
                }}
                className={styles.item}>
                {'Все категории'}
              </li>
            ) : (
              <></>
            )}
            {data?.map((item) => (
              <li
                onClick={() => {
                  changeCategory(item.name, item.id);
                }}
                className={styles.item}
                key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
