import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type ICategoryId, SortByType } from './interface';

const initialState: ICategoryId = {
  searchValue: '',
  category: '',
  sortBy: SortByType.POPULAR
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
    }
  }
});

export const { changeCategory, changeSortBy, setSearchValue } = categorySlice.actions;

export default categorySlice.reducer;
