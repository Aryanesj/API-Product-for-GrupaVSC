import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { PostListItem } from '../types';
import { SLICE_NAME } from './types';

export const getPostListRequest = createAsyncThunk(
  `${SLICE_NAME}/getPostListRequest`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      method: 'get',
      url: '/posts',
    };

    const response = await axios.request<PostListItem[]>(requestConfig);

    return response.data;
  },
);
