import { FC, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { commentListSlice } from '../commentListSlice';
import { CommentListItemAddForm } from '../CommentListItemAddForm';
import { CommentListItemEditForm } from '../CommentListItemEditForm';
import { CommentItemForm } from './CommentItemForm';

const customModalStyles = {
  content: {
    borderRadius: '10px',
    backgroundColor: '#fff',
    maxWidth: '1024px',
    margin: '0 auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
};

Modal.setAppElement('#modal');

interface CommentListFormProps {
  postId: number;
}

export const CommentListForm: FC<CommentListFormProps> = ({ postId }) => {
  const commentList = useAppSelector(commentListSlice.selectors.getCommentList);
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [editId, setEditId] = useState<'new' | number>('new');

  if (!commentList) {
    return null;
  }

  const postCommentList = commentList.filter(
    (commentListItem) => commentListItem.postId === postId,
  );

  const handleEdit = (id: number) => {
    setIsShowModal(true);
    setEditId(id);
  };

  const handleDelete = (id: number) => {
    const msg = `Delete comment with id=${id}`;
    if (window.confirm(msg)) {
      dispatch(commentListSlice.actions.deleteComment(id));
    }
  };

  const handleAdd = () => {
    setIsShowModal(true);
    setEditId('new');
  };

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={handleModalClose}
        style={customModalStyles}
        bodyOpenClassName="overflow-hidden"
      >
        {editId === 'new' ? (
          <CommentListItemAddForm postId={postId} onClose={handleModalClose} />
        ) : (
          <CommentListItemEditForm
            postId={postId}
            commentId={editId}
            onClose={handleModalClose}
          />
        )}
      </Modal>
      <div className="p-2 d-flex flex-column gap-2">
        <div className="fw-bold d-flex justify-content-center">
          Comment list
        </div>
        <div>
          <button
            type={'button'}
            className="btn btn-primary"
            onClick={handleAdd}
          >
            Add comment
          </button>
        </div>
        <div className="d-flex gap-2 flex-column">
          {postCommentList.map((postCommentListItem, index) => (
            <CommentItemForm
              commentListItem={postCommentListItem}
              key={postCommentListItem.id}
              index={index + 1}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};
