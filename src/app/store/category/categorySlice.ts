import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum SortByType {
  FRESH = 'Свежее',
  POPULAR = 'Популярное'
}

export interface ICategoryId {
  searchValue: string;
  categoryId: number;
  sortBy: SortByType;
}

const initialState: ICategoryId = {
  searchValue: '',
  categoryId: 0,
  sortBy: SortByType.POPULAR
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    changeSortBy: (state, action: PayloadAction<SortByType>) => {
      state.sortBy = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    }
  }
});

export const { changeCategoryId, changeSortBy, setSearchValue } = categorySlice.actions;

export default categorySlice.reducer;
