import { type FC, useState, useRef } from 'react';
import { Category } from '@/shared/Ui/Category/Category';
import { Search } from '@/shared/Ui/Search/Search';

import styles from './BlogPage.module.scss';
import { Posts } from '@/widgets/Posts/Posts';
import { PostsByCategory } from '@/widgets/PostsByCategory/PostsByCategory';
import { SearchedPosts } from '@/widgets/SearchedPosts/SearchedPosts';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/redux';
import { SortBy } from '@/shared/Ui/SortBy/SortByNew';
import { ScrollUp } from '@/shared/Ui/ScrollUp/ScrollUp';
import { ModalWindow } from '@/widgets/Modal/Modal';
import { changeLimit } from '@/app/store/category/categorySlice';

export const BlogPage: FC = () => {
  const [arrowShow, setArrowShow] = useState(false);

  const { category, searchValue, limit } = useAppSelector((state) => state.categoryId);
  const dispatch = useAppDispatch();

  const divRef = useRef<HTMLDivElement>(null);

  const handleScroll = (): void => {
    const element = divRef.current;
    if (element) {
      const scrollHeight = element.scrollHeight;
      const scrollTop = element.scrollTop;
      console.log(window.innerHeight);
      if (scrollTop + window.innerHeight - 15 === scrollHeight) {
        dispatch(changeLimit(limit + 2));
      }
      if (scrollTop && scrollTop > 600 && !arrowShow) {
        setArrowShow(true);
      }

      if (scrollTop && scrollTop <= 600 && arrowShow) {
        setArrowShow(false);
      }
    }
  };

  return (
    <div id="ref" ref={divRef} onScroll={handleScroll} className={styles.main_content}>
      {arrowShow && <ScrollUp />}
      <div className={styles.search}>
        <Search />
        <ModalWindow />
        <div className={styles.sort}>
          <Category />
          <SortBy />
        </div>
      </div>
      {searchValue ? <SearchedPosts /> : category && !searchValue ? <PostsByCategory /> : <Posts />}
    </div>
  );
};
