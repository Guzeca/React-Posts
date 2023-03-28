import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IPostByCategory, type ICategories } from '@/app/store/category/interface';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/'
  }),
  endpoints: (build) => ({
    getCategories: build.query<ICategories[], void>({
      query: () => ({
        url: 'categories'
      })
    }),
    getAllProductsByCategory: build.query<IPostByCategory[], string>({
      query: (id) => `categories/${id}/products`
    })
  })
});

export const { useGetCategoriesQuery, useGetAllProductsByCategoryQuery } = categoryAPI;
