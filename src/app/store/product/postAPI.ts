import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IPosts } from '@/app/store/product/interface';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/'
  }),
  endpoints: (build) => ({
    getPosts: build.query<IPosts[], number>({
      query: (limit = 2) => `products?offset=0&limit=${limit}`
    }),
    getOnePost: build.query<IPosts, number>({
      query: (id) => `products/${id}`
    })
  })
});

export const { useGetPostsQuery, useGetOnePostQuery } = postAPI;
