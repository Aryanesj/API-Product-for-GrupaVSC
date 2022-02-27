import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { postListSlice } from '../postListSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { PostItemForm } from './PostItemForm';

export const PostListForm: FC = () => {
  const dispatch = useAppDispatch();
  const postList = useAppSelector(postListSlice.selectors.getPostList);
  const showCommentListPostId = useAppSelector(
    postListSlice.selectors.getShowCommentListPostId,
  );

  const handlePostItemEdit = (id: number) => {
    const path = getRoutePath('PostEditPage', id.toString());

    dispatch(appSlice.actions.redirect(path));
  };

  const handlePostItemDelete = (id: number) => {
    const msg = `Delete post with id=${id}`;
    if (window.confirm(msg)) {
      dispatch(postListSlice.actions.deletePost(id));
    }
  };

  const handlePostItemAdd = () => {
    const path = getRoutePath('PostNewPage');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleShowCommentListForPostItem = (id: number) => {
    dispatch(postListSlice.actions.setShowCommentListPostId(id));
  };

  const handleHideCommentListForPostItem = () => {
    dispatch(postListSlice.actions.setShowCommentListPostId(null));
  };

  return (
    <div className="d-flex flex-column gap-2">
      <h3 className="h3">Post list</h3>
      <div>
        <button
          type={'button'}
          className="btn btn-primary"
          onClick={handlePostItemAdd}
        >
          Add post
        </button>
      </div>
      <div className="d-flex flex-column gap-2">
        {postList
          ? postList.map((postListItem, index) => (
              <div key={postListItem.id}>
                <PostItemForm
                  postListItem={postListItem}
                  index={index + 1}
                  onEdit={handlePostItemEdit}
                  onDelete={handlePostItemDelete}
                  onShowCommentList={handleShowCommentListForPostItem}
                  onHideCommentList={handleHideCommentListForPostItem}
                  isShowCommentList={postListItem.id === showCommentListPostId}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
