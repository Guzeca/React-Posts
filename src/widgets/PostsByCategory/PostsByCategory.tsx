import { useGetAllProductsByCategoryQuery } from '@/app/store/category/categoryAPI';
import { useAppSelector } from '@/app/store/hooks/redux';
import { type FC } from 'react';

import styles from './PostsByCategory.module.scss';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { SortByType } from '@/app/store/category/categorySlice';

export const PostsByCategory: FC = () => {
  const { categoryId } = useAppSelector((state) => state.categoryId);
  const { sortBy } = useAppSelector((state) => state.categoryId);

  const { data, isLoading, error } = useGetAllProductsByCategoryQuery(String(categoryId));

  const PostsByCategory =
    sortBy === SortByType.POPULAR
      ? data?.slice().sort((a, b) => a.price - b.price)
      : data?.slice().sort((a, b) => Date.parse(a.creationAt) - Date.parse(b.creationAt));

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
