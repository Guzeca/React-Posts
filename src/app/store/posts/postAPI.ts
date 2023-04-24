import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IPosts } from '@/app/store/posts/interface';
import { SortByType } from '../category/interface';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6428495546fd35eb7c4fa334.mockapi.io/'
  }),
  tagTypes: ['Posts', 'Post'],
  endpoints: (build) => ({
    getPosts: build.query<IPosts[], { limit: number; order: SortByType }>({
      query: ({ limit = 2, order = SortByType.POPULAR }) =>
        `posts?page=1&limit=${limit}&orderBy=${order}&order=desc`,
      providesTags: ['Posts']
    }),
    getPostsByName: build.query<IPosts[], string>({
      query: (search = '') => `posts?search=${search}`
    }),
    getOnePost: build.query<IPosts[], string>({
      query: (id) => `posts?id=${id}`,
      providesTags: ['Post']
    }),
    createPost: build.mutation<IPosts, IPosts>({
      query: (post) => ({
        url: 'posts/',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: build.mutation<IPosts[], IPosts>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Posts']
    }),
    updateComment: build.mutation<IPosts[], IPosts>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Post']
    })
  })
});

export const {
  useGetPostsQuery,
  useGetOnePostQuery,
  useGetPostsByNameQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdateCommentMutation
} = postAPI;
