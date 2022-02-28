import { FC } from 'react';
import { CommentListItem } from '../types';
import { CommentListItemForm } from '../CommentListItemForm';
import { useAppDispatch } from '../../../store/hooks';
import { commentListSlice } from '../commentListSlice';

interface CommentListItemAddForm {
  postId: number;
  onClose(): void;
}

const FORM_TITLE = 'Add new comment';

export const CommentListItemAddForm: FC<CommentListItemAddForm> = ({
  postId,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const initialValues: CommentListItem = {
    postId,
    id: 0,
    body: '',
    email: '',
    name: '',
  };

  const handleSubmit = (values: CommentListItem) => {
    dispatch(commentListSlice.actions.addComment(values));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <CommentListItemForm
        formTitle={FORM_TITLE}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};
