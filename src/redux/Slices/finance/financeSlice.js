import { createSlice } from '@reduxjs/toolkit';
import { getAllTransactions } from './operations';

const initialState = {
  totalBalance: 0,
  isLoading: false,
  data: [],
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.data = [];
  state.error = action.payload;
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllTransactions.pending, handlePending)
      .addCase(getAllTransactions.rejected, handleRejected)
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

export const financeReducer = financeSlice.reducer;

export const { updateTotalBalance } = financeSlice.actions;
