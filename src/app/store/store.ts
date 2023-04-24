import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postAPI } from '@/app/store/posts/postAPI';
import { categoryAPI } from './category/categoryAPI';
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import categoryId from './category/categorySlice';
import post from './posts/postSlice';

const rootReducer = combineReducers({
  [postAPI.reducerPath]: postAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  categoryId,
  post
});

export const setupStore = (): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([postAPI.middleware, categoryAPI.middleware])
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
