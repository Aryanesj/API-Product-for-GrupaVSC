import { configureStore } from '@reduxjs/toolkit';
// import { postListSlice } from '../features/PostList/postListSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    // postList: postListSlice.reducer,
  },
});
