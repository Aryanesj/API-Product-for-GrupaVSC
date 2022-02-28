import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { commentListSlice } from '../commentListSlice';
import { CommentListItemForm } from '../CommentListItemForm';
import { CommentListItem } from '../types';

interface CommentListItemEditFormProps {
  postId: number;
  commentId: number;
  onClose(): void;
}

export const CommentListItemEditForm: FC<CommentListItemEditFormProps> = ({
  commentId,
  postId,
  onClose,
}) => {
  const commentList = useAppSelector(commentListSlice.selectors.getCommentList);
  const dispatch = useAppDispatch();

  if (!commentList) {
    return null;
  }

  const commentListItemIndex = commentList.findIndex(
    (commentListItem) => commentListItem.id === commentId,
  );

  if (commentListItemIndex === -1) {
    return <div className="alert-danger p-2 rounded">Not found</div>;
  }

  const initialValues: CommentListItem = commentList[commentListItemIndex];

  const formTitle = `Edit comment with id=${commentId}`;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (values: CommentListItem) => {
    dispatch(
      commentListSlice.actions.patchComment({
        commentId,
        commentListItem: values,
      }),
    );
    onClose();
  };

  return (
    <CommentListItemForm
      formTitle={formTitle}
      initialValues={initialValues}
      onCancel={handleClose}
      onSubmit={handleSubmit}
    />
  );
};
