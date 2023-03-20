import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IWish } from '@/app/store/product/interface';

export const wishesAPI = createApi({
  reducerPath: 'wishesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6416d5dd3fbb68b01bff1bf1.mockapi.io'
  }),
  endpoints: (build) => ({
    fetchWishPage: build.query<IWish[], void>({
      query: () => ({
        url: '/Wish_Page'
      })
    }),
    fetchSneakersPage: build.query<IWish, string>({
      query: (id) => ({
        url: '/sneakers/' + id
      })
    })
  })
});
