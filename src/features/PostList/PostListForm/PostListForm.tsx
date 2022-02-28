import { FC, useEffect, useState } from 'react';
import { Element, scroller } from 'react-scroll';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { postListSlice } from '../postListSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { commentListSlice } from '../../commentList/commentListSlice';
import { PostItemForm } from './PostItemForm';

const getReactScrollElementName = (id: number): string =>
  `react-scroll-element-name-${id}`;

export const PostListForm: FC = () => {
  const dispatch = useAppDispatch();

  const [scrollToElementId, setScrollToElementId] = useState<{
    id: number;
  } | null>(null);

  useEffect(() => {
    if (scrollToElementId) {
      scroller.scrollTo(getReactScrollElementName(scrollToElementId.id), {
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [scrollToElementId]);

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
      dispatch(commentListSlice.actions.deletePostCommentList(id));
    }
  };

  const handlePostItemAdd = () => {
    const path = getRoutePath('PostNewPage');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleShowCommentListForPostItem = (id: number) => {
    dispatch(postListSlice.actions.setShowCommentListPostId(id));
    setScrollToElementId({ id });
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
              <Element
                key={postListItem.id}
                name={getReactScrollElementName(postListItem.id)}
              >
                <PostItemForm
                  postListItem={postListItem}
                  index={index + 1}
                  onEdit={handlePostItemEdit}
                  onDelete={handlePostItemDelete}
                  onShowCommentList={handleShowCommentListForPostItem}
                  onHideCommentList={handleHideCommentListForPostItem}
                  isShowCommentList={postListItem.id === showCommentListPostId}
                />
              </Element>
            ))
          : null}
      </div>
    </div>
  );
};