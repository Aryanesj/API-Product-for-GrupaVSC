import { FC, useEffect } from 'react';
import { Router } from '../router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postListSlice } from '../features/PostList/postListSlice';
import { RequestErrorMSG } from '../components/RequestErrorMSG';
import { commentListSlice } from '../features/commentList/commentListSlice/index';
import { Spinner } from './Spinner';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const postListLoadRequestError = useAppSelector(
    postListSlice.selectors.getRequestError,
  );
  const postList = useAppSelector(postListSlice.selectors.getPostList);
  const commentListLoadRequestError = useAppSelector(
    commentListSlice.selectors.getRequestError,
  );
  const commentList = useAppSelector(commentListSlice.selectors.getCommentList);

  useEffect(() => {
    dispatch(postListSlice.thunks.getPostListRequest());
    dispatch(commentListSlice.thunks.getCommentListRequest());
  }, []);

  return (
    <>
      <Spinner />
      <div className="container mt-2">
        <div className="d-flex flex-column gap-2">
          {postListLoadRequestError ? (
            <RequestErrorMSG
              requestError={postListLoadRequestError}
              title={'Error post load!'}
            />
          ) : null}
          {commentListLoadRequestError ? (
            <RequestErrorMSG
              requestError={commentListLoadRequestError}
              title={'Error comment load!'}
            />
          ) : null}
        </div>

        <div>{postList && commentList ? <Router /> : null}</div>
      </div>
    </>
  );
};