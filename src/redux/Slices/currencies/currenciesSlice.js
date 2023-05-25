import {  createSlice } from '@reduxjs/toolkit';
import { getCurrencies } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.items = [];
  state.error = action.payload;
};

const initialState = { isLoading: false, error: null, items: [] };
const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  extraReducers: {
    [getCurrencies.pending]: handlePending,

    [getCurrencies.rejected]: handleRejected,

    [getCurrencies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.payload.items = action.payload;
    },
  },
});

export const currenciesReducer = currenciesSlice.reducer;
