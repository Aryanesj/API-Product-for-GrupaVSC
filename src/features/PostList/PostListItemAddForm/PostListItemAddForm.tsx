import { FC } from 'react';
import { PostListItem } from '../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { postListSlice } from '../postListSlice';
import { PostListItemForm } from '../PostListItemForm';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';

const INITIAL_VALUES: PostListItem = {
  id: 0,
  title: '',
  body: '',
  userId: 0,
};

const FORM_TITLE = 'Add new post';

export const PostListItemAddForm: FC = () => {
  const dispatch = useAppDispatch();
  const postList = useAppSelector(postListSlice.selectors.getPostList);

  if (!postList) {
    return null;
  }

  const handleCancel = () => {
    const path = getRoutePath('PostListPage');
    dispatch(appSlice.actions.redirect(path));
  };
  const handleSubmit = (values: PostListItem) => {
    // console.log(values);

    dispatch(postListSlice.actions.addPost(values));

    const path = getRoutePath('PostListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <>
      <PostListItemForm
        initialValues={INITIAL_VALUES}
        formTitle={FORM_TITLE}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};
