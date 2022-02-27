import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { commentListSlice } from '../commentListSlice';
import { CommentItemForm } from './CommentItemForm';

interface CommentListFormProps {
  id: number;
}

export const CommentListForm: FC<CommentListFormProps> = ({ id }) => {
  const commentList = useAppSelector(commentListSlice.selectors.getCommentList);
  if (!commentList) {
    return null;
  }

  const postCommentList = commentList.filter(
    (commentListItem) => commentListItem.postId === id,
  );

  return (
    <div>
      <div className="fw-bold d-flex justify-content-center">Comment list</div>
      <div className="d-flex gap-2 flex-column">
        {postCommentList.map((postCommentListItem, index) => (
          <CommentItemForm
            commentListItem={postCommentListItem}
            key={postCommentListItem.id}
            index={index + 1}
          />
        ))}
      </div>

      {/*<pre>{JSON.stringify(postCommentList, null, 2)}</pre>*/}
    </div>
  );
};
