import { createSlice } from '@reduxjs/toolkit';
import { getTransactions } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.items = [];
  state.error = action.payload;
};

const initialState = { isLoading: false, error: null, items: [] };
const transactionSlices = createSlice({
  name: 'currencies',
  initialState,
  extraReducers: {
    [getTransactions.pending]: handlePending,

    [getTransactions.rejected]: handleRejected,

    [getTransactions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.payload.items = action.payload;
    },
  },
});

export const transactionsReducer = transactionSlices.reducer;
