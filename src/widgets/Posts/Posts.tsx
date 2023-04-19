import { Blog } from '@/shared/Ui/Blog/Blog';
import { Loader } from '@/shared/Ui/Loader/Loader';
import { type FC } from 'react';
import { useAppSelector } from '@/app/store/hooks/redux';
import { useGetPostsByNameQuery, useGetPostsQuery } from '@/app/store/posts/postAPI';
import { useGetAllProductsByCategoryQuery } from '@/app/store/category/categoryAPI';
import { type IPosts, TypeOfPosts } from '@/app/store/posts/interface';

import styles from './Posts.module.scss';

export const Posts: FC = () => {
  const { post, limit } = useAppSelector((state) => state.post);
  const { sortBy, category, searchValue } = useAppSelector((state) => state.categoryId);

  const posts = useGetPostsQuery({ limit, order: sortBy }, { skip: post !== TypeOfPosts.REGULAR });

  const postsByCategory = useGetAllProductsByCategoryQuery(
    {
      category,
      limit,
      order: sortBy
    },
    { skip: post !== TypeOfPosts.CATEGORY }
  );

  const searchPosts = useGetPostsByNameQuery(searchValue, { skip: post !== TypeOfPosts.SEARCH });

  const PrimaryPosts: FC = () => {
    return (
      <>
        {posts.isLoading ? (
          <Loader />
        ) : posts.error ? (
          <div>{'Ошибка'}</div>
        ) : (
          posts.data?.map((value: IPosts) => <Blog key={value.id} {...value} />)
        )}
      </>
    );
  };
  const PostsByCategory: FC = () => {
    return (
      <>
        {postsByCategory.isLoading ? (
          <Loader />
        ) : postsByCategory.error ? (
          <div>{'Ошибка'}</div>
        ) : (
          postsByCategory.data?.map((value: IPosts) => <Blog key={value.id} {...value} />)
        )}
      </>
    );
  };
  const SearchPosts: FC = () => {
    return (
      <>
        {searchPosts.isLoading ? (
          <Loader />
        ) : searchPosts.error ? (
          <div>{'Ошибка'}</div>
        ) : (
          searchPosts.data?.map((value: IPosts) => <Blog key={value.id} {...value} />)
        )}
        {searchPosts.isSuccess && searchPosts.data.length === 0 && (
          <div className={styles.empty}>{'Ничего не найдено :('}</div>
        )}
      </>
    );
  };

  return (
    <div className={styles.blog}>
      {post === TypeOfPosts.REGULAR ? (
        <PrimaryPosts />
      ) : post === TypeOfPosts.CATEGORY ? (
        <PostsByCategory />
      ) : (
        <SearchPosts />
      )}
    </div>
  );
};
