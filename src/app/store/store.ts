import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postAPI } from '@/app/store/product/postAPI';
import { commentAPI } from './comment/commentAPI';
import { categoryAPI } from './category/categoryAPI';
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import categoryId from './category/categorySlice';

const rootReducer = combineReducers({
  [postAPI.reducerPath]: postAPI.reducer,
  [commentAPI.reducerPath]: commentAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  categoryId
});

export const setupStore = (): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        postAPI.middleware,
        commentAPI.middleware,
        categoryAPI.middleware
      ])
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
