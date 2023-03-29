import { useGetPostsQuery } from '@/app/store/product/postAPI';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { useState, type FC, useEffect } from 'react';
import { useAppSelector } from '@/app/store/hooks/redux';
import { SortByType } from '@/app/store/category/categorySlice';

import styles from './Posts.module.scss';

export const Posts: FC = () => {
  const [limit, setLimit] = useState(2);

  const { sortBy } = useAppSelector((state) => state.categoryId);

  const { data, isLoading, error } = useGetPostsQuery(limit);

  const posts =
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
        posts?.map((item) => <Blog key={item.id} {...item} />)
      )}
    </div>
  );
};
