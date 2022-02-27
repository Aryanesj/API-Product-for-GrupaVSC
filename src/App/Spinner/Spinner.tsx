import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

import { postListSlice } from '../../features/PostList/postListSlice';
import { commentListSlice } from '../../features/commentList/commentListSlice';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  //ЕСЛИ ХОТЯ БЫ 1 из данных флагов равен true, то будет показан индикатор загрузки

  const postListIsloading = useAppSelector(
    postListSlice.selectors.getIsLoading,
  );

  const commentListIsLoading = useAppSelector(
    commentListSlice.selectors.getIsLoading,
  );

  const isLoading = commentListIsLoading || postListIsloading;

  return isLoading ? <div className={styles.Spinner} /> : null;
};
