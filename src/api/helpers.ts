import { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_DEFAULT_REQUEST_HEADERS } from '../config';

export const getDefaultRequestConfig = (): AxiosRequestConfig => ({
  headers: API_DEFAULT_REQUEST_HEADERS,
  baseURL: API_BASE_URL,
});