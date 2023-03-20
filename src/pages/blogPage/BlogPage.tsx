import { useEffect, type FC, useState } from 'react';
import styles from './BlogPage.module.scss';
import { Blog } from '@/shared/Ui/Blog/Blog';
import { Loader } from '@/shared/Ui/Loader/Loader';

export const BlogPage: FC = () => {
  const [loadPost, setLoadPost] = useState(false);
  const [news, setNews] = useState(2);

  const handleScroll = (): void => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight >= scrollHeight) {
      setLoadPost(true);
      setTimeout(() => {
        setLoadPost(false);
        setNews((prev) => prev + 1);
      }, 1500);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div onScroll={handleScroll} className={styles.main_content}>
      <div className={styles.blog}>
        {[...Array(news)].map((_, index) => (
          <Blog title={index} key={index} />
        ))}
      </div>
      {loadPost && <div className={styles.load}>{<Loader />}</div>}
    </div>
  );
};
