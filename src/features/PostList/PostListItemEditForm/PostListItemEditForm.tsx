import { FC } from 'react';
import { PostListItemForm } from '../PostListItemForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { postListSlice } from '../postListSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { PostListItem } from '../types';

interface PostListItemEditFormProps {
  id: string;
}

export const PostListItemEditForm: FC<PostListItemEditFormProps> = ({ id }) => {
  const postList = useAppSelector(postListSlice.selectors.getPostList);
  const dispatch = useAppDispatch();

  if (!postList) {
    return null;
  }

  const postListItemIndex = postList.findIndex(
    (postListItem) => postListItem.id.toString() === id,
  );

  if (postListItemIndex === -1) {
    return (
      <div className="alert-danger p-2 rounded">
        Not found post with id={id}
      </div>
    );
  }

  const postListItem = postList[postListItemIndex];

  const formTitle = `Edit post with id=${id}`;

  const handleCancel = () => {
    const path = getRoutePath('PostListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleSave = (values: PostListItem) => {
    dispatch(
      postListSlice.actions.patchPost({ postListItem: values, id: values.id }),
    );
    const path = getRoutePath('PostListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <PostListItemForm
      initialValues={postListItem}
      onCancel={handleCancel}
      onSubmit={handleSave}
      formTitle={formTitle}
    />
  );
};
