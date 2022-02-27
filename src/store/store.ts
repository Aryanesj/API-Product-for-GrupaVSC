import { configureStore } from '@reduxjs/toolkit';
import { postListSlice } from '../features/PostList/postListSlice';
import { commentListSlice } from '../features/commentList/commentListSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    postList: postListSlice.reducer,
    commentList: commentListSlice.reducer,
  },
});
