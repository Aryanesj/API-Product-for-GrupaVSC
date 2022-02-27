import { RequestError, RootState } from '../../../store/types';
import { CommentListItem } from '../types';

export const getIsLoading = (state: RootState): boolean =>
  state.commentList.isLoading;

export const getRequestError = (state: RootState): RequestError | null =>
  state.commentList.requestError;

export const getCommentList = (state: RootState): CommentListItem[] | null =>
  state.commentList.commentList;
