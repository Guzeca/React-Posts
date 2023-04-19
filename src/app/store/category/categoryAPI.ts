import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  type IPostByCategory,
  type ICategories,
  type SortByType
} from '@/app/store/category/interface';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6428495546fd35eb7c4fa334.mockapi.io/'
  }),
  endpoints: (build) => ({
    getCategories: build.query<ICategories[], void>({
      query: () => ({
        url: 'category'
      })
    }),
    getAllProductsByCategory: build.query<
      IPostByCategory[],
      { category: string; limit: number; order: SortByType }
    >({
      query: ({ category, limit, order }) =>
        `posts?category=${category}&page=1&limit=${limit}&orderBy=${order}&order=desc`
    })
  })
});

export const { useGetCategoriesQuery, useGetAllProductsByCategoryQuery } = categoryAPI;
