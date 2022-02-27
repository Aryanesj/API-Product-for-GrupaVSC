import { FC } from 'react';
import { CommentListItem } from '../../types';

interface CommentItemFormProps {
  commentListItem: CommentListItem;
  index: number;
}

export const CommentItemForm: FC<CommentItemFormProps> = ({
  commentListItem,
  index,
}) => {
  return (
    <div className="border rounded p-2 d-flex gap-2 flex-column">
      <div>
        {index}. [commentId={commentListItem.id}] [postId=
        {commentListItem.postId}]
      </div>
      <div>
        <span className="fw-bold">email:</span> {commentListItem.email}
      </div>
      <div>
        <span className="fw-bold">name: </span> {commentListItem.name}
      </div>
      <div>
        <span className="fw-bold">comment body:</span> {commentListItem.body}
      </div>
    </div>
  );
};
