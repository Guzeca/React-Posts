import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IPosts } from '@/app/store/posts/interface';
import { type SortByType } from '../category/categorySlice';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6428495546fd35eb7c4fa334.mockapi.io/'
  }),
  endpoints: (build) => ({
    getPosts: build.query<IPosts[], { limit: number; order: SortByType }>({
      query: ({ limit = 2, order }) => `posts?page=1&limit=${limit}&orderBy=${order}&order=desc`
    }),
    getPostsByName: build.query<IPosts[], string>({
      query: (search = '') => `posts?search=${search}`
    }),
    getOnePost: build.query<IPosts[], number>({
      query: (id) => `posts?id=${id}`
    }),
    createPost: build.mutation<IPosts, IPosts>({
      query: (post) => ({
        url: 'posts/',
        method: 'POST',
        body: post
      })
    })
  })
});

export const {
  useGetPostsQuery,
  useGetOnePostQuery,
  useGetPostsByNameQuery,
  useCreatePostMutation
} = postAPI;
