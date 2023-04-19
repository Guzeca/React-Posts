import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type IPost, TypeOfPosts } from './interface';

const initialState: IPost = {
  post: TypeOfPosts.REGULAR,
  limit: 2
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePost: (state, action: PayloadAction<TypeOfPosts>) => {
      state.post = action.payload;
    },
    changeLimit: (state) => {
      state.limit = state.limit + 2;
    },
    setBaseLimit: (state) => {
      state.limit = 2;
    }
  }
});

export const { changePost, changeLimit, setBaseLimit } = postSlice.actions;

export default postSlice.reducer;
