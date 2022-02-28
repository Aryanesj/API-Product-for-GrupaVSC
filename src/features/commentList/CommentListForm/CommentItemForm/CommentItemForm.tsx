import { FC } from 'react';
import { CommentListItem } from '../../types';
import styles from './CommentItemForm.module.scss';

interface CommentItemFormProps {
  commentListItem: CommentListItem;
  index: number;
  onEdit(id: number): void;
  onDelete(id: number): void;
}

export const CommentItemForm: FC<CommentItemFormProps> = ({
  commentListItem,
  index,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    onEdit(commentListItem.id);
  };

  const handleDelete = () => {
    onDelete(commentListItem.id);
  };

  return (
    <div className="border rounded p-2 d-flex gap-2 flex-column">
      <div className="d-flex justify-content-between">
        <div>
          {index}. [id={commentListItem.id}][pId=
          {commentListItem.postId}]
        </div>
        <div className={`d-flex gap-2 ${styles.btnsWrap}`}>
          <button
            type={'button'}
            className="btn btn-primary w-100"
            onClick={handleEdit}
          >
            edit
          </button>
          <button
            type={'button'}
            className="btn btn-danger w-100"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
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
