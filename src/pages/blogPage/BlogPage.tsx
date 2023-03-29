import { useEffect, type FC, useState } from 'react';
import { Category } from '@/shared/Ui/Category/Category';
import { Search } from '@/shared/Ui/Search/Search';

import styles from './BlogPage.module.scss';
import { Posts } from '@/widgets/Posts/Posts';
import { PostsByCategory } from '@/widgets/PostsByCategory/PostsByCategory';
import { SearchedPosts } from '@/widgets/SearchedPosts/SearchedPosts';
import { useAppSelector } from '@/app/store/hooks/redux';
import { SortBy } from '@/shared/Ui/SortBy/SortByNew';
import { ScrollUp } from '@/shared/Ui/ScrollUp/ScrollUp';

export const BlogPage: FC = () => {
  const [arrowShow, setArrowShow] = useState(false);
  const { categoryId, searchValue } = useAppSelector((state) => state.categoryId);

  const handleScroll = (): void => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (scrollTop > 600 && !arrowShow) {
      setArrowShow(true);
    }

    if (scrollTop <= 600 && arrowShow) {
      setArrowShow(false);
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
      {arrowShow && <ScrollUp />}
      <div className={styles.search}>
        <Search />
        <div className={styles.sort}>
          <Category />
          <SortBy />
        </div>
      </div>
      {searchValue ? (
        <SearchedPosts />
      ) : categoryId && !searchValue ? (
        <PostsByCategory />
      ) : (
        <Posts />
      )}
    </div>
  );
};
