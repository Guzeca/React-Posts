import { type FC, useEffect, useState } from 'react';
import styles from './BlogPage.module.scss';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { useGetPostsQuery } from '@/app/store/product/postAPI';

export const BlogPage: FC = () => {
  const [limit, setLimit] = useState(2);
  const { data: posts, isLoading, error } = useGetPostsQuery(limit);

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
    <div className={styles.main_content}>
      <div className={styles.blog}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{'Ошибка'}</div>
        ) : (
          posts?.map((item) => <Blog key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
};
