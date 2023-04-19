import { type FC, useState, useRef } from 'react';
import { Category } from '@/shared/Ui/Category/Category';
import { Search } from '@/shared/Ui/Search/Search';
import { Posts } from '@/widgets/Posts/Posts';
import { SortBy } from '@/shared/Ui/SortBy/SortByNew';
import { ScrollUp } from '@/shared/Ui/ScrollUp/ScrollUp';
import { ModalWindow } from '@/widgets/Modal/Modal';
import { useAppDispatch } from '@/app/store/hooks/redux';
import { changeLimit } from '@/app/store/posts/postSlice';

import styles from './BlogPage.module.scss';

export const BlogPage: FC = () => {
  const [arrowShow, setArrowShow] = useState(false);

  const dispatch = useAppDispatch();

  const divRef = useRef<HTMLDivElement>(null);

  const handleScroll = (): void => {
    const element = divRef.current;
    if (element) {
      const scrollHeight = element.scrollHeight;
      const scrollTop = element.scrollTop;
      if (scrollTop + window.innerHeight === scrollHeight) {
        dispatch(changeLimit());
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
      {<Posts />}
    </div>
  );
};
