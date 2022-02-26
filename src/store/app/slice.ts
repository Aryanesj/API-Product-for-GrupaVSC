import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRedirectUrl, SLICE_NAME } from './types';

interface AppInitialState {
  redirectUrl: AppRedirectUrl | null;
}

const initialState: AppInitialState = {
  redirectUrl: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    redirect: (state, action: PayloadAction<string>) => {
      state.redirectUrl = {
        path: action.payload,
      };
    },
  },
});
