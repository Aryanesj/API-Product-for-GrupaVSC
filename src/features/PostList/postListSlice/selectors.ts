import { RequestError, RootState } from '../../../store/types';
import { PostListItem } from '../types';

export const getIsLoading = (state: RootState): boolean =>
  state.postList.isLoading;

export const getPostList = (state: RootState): PostListItem[] | null =>
  state.postList.postList;

export const getRequestError = (state: RootState): RequestError | null =>
  state.postList.requestError;

export const getShowCommentListPostId = (state: RootState): number | null =>
  state.postList.showCommentListPostId;
