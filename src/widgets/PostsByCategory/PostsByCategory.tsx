import { useGetAllProductsByCategoryQuery } from '@/app/store/category/categoryAPI';
import { useAppSelector } from '@/app/store/hooks/redux';
import { useState, type FC, useEffect } from 'react';

import styles from './PostsByCategory.module.scss';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { SortByType } from '@/app/store/category/categorySlice';

export const PostsByCategory: FC = () => {
  const [limit, setLimit] = useState(3);
  const { categoryId } = useAppSelector((state) => state.categoryId);
  const { sortBy } = useAppSelector((state) => state.categoryId);

  const { data, isLoading, error } = useGetAllProductsByCategoryQuery({
    id: String(categoryId),
    limit
  });

  const PostsByCategory =
    sortBy === SortByType.POPULAR
      ? data?.slice().sort((a, b) => b.price - a.price)
      : data?.slice().sort((a, b) => Date.parse(b.creationAt) - Date.parse(a.creationAt));

  const handleScroll = (): void => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight >= scrollHeight) {
      setLimit((prev) => prev + 2);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div className={styles.blog}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{'Ошибка'}</div>
      ) : (
        PostsByCategory?.map((item) => <Blog key={item.id} {...item} />)
      )}
    </div>
  );
};
