import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestError } from '../../../store/types';
import { PostListItem } from '../types';
import { getErrorData } from '../../../store/helpers';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  isLoading: boolean;
  requestError: RequestError | null;
  postList: PostListItem[] | null;
  maxId: number;
  showCommentListPostId: number | null;
}

const initialState: InitialState = {
  isLoading: false,
  postList: null,
  requestError: null,
  maxId: 0,
  showCommentListPostId: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setShowCommentListPostId: (state, action: PayloadAction<number | null>) => {
      state.showCommentListPostId = action.payload;
    },

    deletePost: (state, action: PayloadAction<number>) => {
      if (state.postList) {
        state.postList = state.postList.filter(
          (postItem) => postItem.id !== action.payload,
        );
      }
    },

    patchPost: (
      state,
      action: PayloadAction<{ id: number; postListItem: PostListItem }>,
    ) => {
      if (state.postList) {
        const index = state.postList.findIndex(
          (postListItem) => postListItem.id === action.payload.id,
        );
        state.postList[index] = action.payload.postListItem;
      }
    },

    addPost: (state, action: PayloadAction<PostListItem>) => {
      if (state.postList) {
        const newId = state.maxId + 1;
        state.maxId = newId;
        state.postList.unshift({ ...action.payload, id: newId });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.getPostListRequest.pending, (state) => {
        state.isLoading = true;
        state.requestError = null;
        state.postList = null;
      })
      .addCase(thunks.getPostListRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList = action.payload;
        //get the maxId to use it to get the ID when adding a new entry
        const postIdList: number[] = action.payload.map(
          (postListItem) => postListItem.id,
        );
        state.maxId = Math.max(...postIdList);
      })
      .addCase(thunks.getPostListRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.requestError = getErrorData(error);
      });
  },
});
