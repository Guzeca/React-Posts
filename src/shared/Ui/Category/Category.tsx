import { useState, type FC, useRef } from 'react';
import styles from './Category.module.scss';
import { useGetCategoriesQuery } from '@/app/store/category/categoryAPI';
import { useOnClickOutside } from '@/shared/hooks/useClickOutside';
import { useAppDispatch } from '@/app/store/hooks/redux';
import { changeCategory } from '@/app/store/category/categorySlice';
import { changePost, setBaseLimit } from '@/app/store/posts/postSlice';
import { TypeOfPosts } from '@/app/store/posts/interface';

export const Category: FC = () => {
  const [category, setCategory] = useState('Все категории');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const { data } = useGetCategoriesQuery();

  const handleCategory = (item: string): void => {
    if (item === 'Все категории') {
      dispatch(changeCategory(''));
      dispatch(setBaseLimit());
      dispatch(changePost(TypeOfPosts.REGULAR));
    } else {
      dispatch(changeCategory(item.toLowerCase()));
      dispatch(setBaseLimit());
      dispatch(changePost(TypeOfPosts.CATEGORY));
    }
    setCategory(item);
    setOpen(false);
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
                  handleCategory('Все категории');
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
                  handleCategory(item.name);
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
