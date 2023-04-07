import { useGetAllProductsByCategoryQuery } from '@/app/store/category/categoryAPI';
import { useAppSelector } from '@/app/store/hooks/redux';
import { type FC } from 'react';

import styles from './PostsByCategory.module.scss';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { Blog } from '@/shared/Ui/Blog/Blog';

export const PostsByCategory: FC = () => {
  const { category, sortBy, limit } = useAppSelector((state) => state.categoryId);

  const { data, isLoading, error } = useGetAllProductsByCategoryQuery({
    category,
    limit,
    order: sortBy
  });

  return (
    <div className={styles.blog}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{'Ошибка'}</div>
      ) : (
        data?.map((item) => <Blog key={item.id} {...item} />)
      )}
    </div>
  );
};
