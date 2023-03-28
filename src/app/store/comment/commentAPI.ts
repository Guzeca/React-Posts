import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IComments } from '@/app/store/comment/interface';

export const commentAPI = createApi({
  reducerPath: 'commentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/'
  }),
  endpoints: (build) => ({
    getComments: build.query<IComments[], number>({
      query: (limit = 3) => `users?offset=0&limit=${limit}`
    })
  })
});

export const { useGetCommentsQuery } = commentAPI;
