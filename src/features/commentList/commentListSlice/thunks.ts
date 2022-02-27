import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { CommentListItem } from '../types';
import { SLICE_NAME } from './types';

export const getCommentListRequest = createAsyncThunk(
  `${SLICE_NAME}/getPostListRequest`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      method: 'get',
      url: '/comments',
    };

    const response = await axios.request<CommentListItem[]>(requestConfig);

    return response.data;
  },
);
