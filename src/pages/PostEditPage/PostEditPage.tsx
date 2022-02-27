import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PostListItemEditForm } from '../../features/PostList/PostListItemEditForm';

export const PostEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <PostListItemEditForm id={String(id)} />
    </>
  );
};