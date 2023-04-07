import { useGetPostsQuery } from '@/app/store/posts/postAPI';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { type FC } from 'react';
import { useAppSelector } from '@/app/store/hooks/redux';

import styles from './Posts.module.scss';

export const Posts: FC = () => {
  const { sortBy } = useAppSelector((state) => state.categoryId);

  const { limit } = useAppSelector((state) => state.categoryId);
  const { data: posts, isLoading, error } = useGetPostsQuery({ limit, order: sortBy });

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
