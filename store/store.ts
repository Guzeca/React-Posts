import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { wishesAPI } from '@/app/store/product/wishesAPI';

const rootReducer = combineReducers({
  [wishesAPI.reducerPath]: wishesAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wishesAPI.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
