import { type FC } from 'react';
import { Category } from '@/shared/Ui/Category/Category';
import { Search } from '@/shared/Ui/Search/Search';

import styles from './BlogPage.module.scss';
import { Posts } from '@/widgets/Posts/Posts';
import { PostsByCategory } from '@/widgets/PostsByCategory/PostsByCategory';
import { useAppSelector } from '@/app/store/hooks/redux';
import { SortBy } from '@/shared/Ui/SortBy/SortByNew';

export const BlogPage: FC = () => {
  const { categoryId } = useAppSelector((state) => state.categoryId);

  return (
    <div className={styles.main_content}>
      <div className={styles.search}>
        <Search />
        <div className={styles.sort}>
          <Category />
          <SortBy />
        </div>
      </div>
      {categoryId ? <PostsByCategory /> : <Posts />}
    </div>
  );
};
