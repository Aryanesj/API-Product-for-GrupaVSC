import { createSlice } from '@reduxjs/toolkit';
import { RequestError } from '../../../store/types';
import { CommentListItem } from '../types';
import { getErrorData } from '../../../store/helpers';
import * as thunks from './thunks';
import { SLICE_NAME } from './types';

export {};

interface InitialState {
  isLoading: boolean;
  requestError: RequestError | null;
  commentList: CommentListItem[] | null;
  maxId: number;
}

const initialState: InitialState = {
  isLoading: false,
  requestError: null,
  commentList: null,
  maxId: 0,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunks.getCommentListRequest.pending, (state) => {
        state.isLoading = true;
        state.requestError = null;
        state.commentList = null;
      })
      .addCase(thunks.getCommentListRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentList = action.payload;
        //get the maxId to use it to get the ID when adding a new entry
        const postIdList: number[] = action.payload.map(
          (postListItem) => postListItem.id,
        );
        state.maxId = Math.max(...postIdList);
      })
      .addCase(thunks.getCommentListRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.requestError = getErrorData(error);
      });
  },
});
