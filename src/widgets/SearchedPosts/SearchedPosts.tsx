import { useGetPostsByNameQuery } from '@/app/store/product/postAPI';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { type FC } from 'react';
import { useAppSelector } from '@/app/store/hooks/redux';
import { SortByType } from '@/app/store/category/categorySlice';

import styles from './SearchedPosts.module.scss';

export const SearchedPosts: FC = () => {
  const { searchValue, sortBy } = useAppSelector((state) => state.categoryId);

  const { data, isLoading, error } = useGetPostsByNameQuery(searchValue);

  const posts =
    sortBy === SortByType.POPULAR
      ? data?.slice().sort((a, b) => b.price - a.price)
      : data?.slice().sort((a, b) => Date.parse(b.creationAt) - Date.parse(a.creationAt));

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
