import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum SortByType {
  FRESH = 'creationAt',
  POPULAR = 'rating'
}

export interface ICategoryId {
  searchValue: string;
  category: string;
  sortBy: SortByType;
  limit: number;
}

const initialState: ICategoryId = {
  searchValue: '',
  category: '',
  sortBy: SortByType.POPULAR,
  limit: 2
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    changeSortBy: (state, action: PayloadAction<SortByType>) => {
      state.sortBy = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    changeLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    }
  }
});

export const { changeCategory, changeSortBy, setSearchValue, changeLimit } = categorySlice.actions;

export default categorySlice.reducer;
