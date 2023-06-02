import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  editTransaction,
  getAllTransactions,
  getOneTransaction,
} from './operations';

const initialState = {
  totalBalance: 0,
  isLoading: false,
  data: [],
  selectedTransaction: {},
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
      .addCase(getOneTransaction.pending, handlePending)
      .addCase(addTransaction.pending, handlePending)
      .addCase(editTransaction.pending, handlePending)
      .addCase(getAllTransactions.rejected, handleRejected)
      .addCase(getOneTransaction.rejected, handleRejected)
      .addCase(addTransaction.rejected, handlePending)
      .addCase(editTransaction.rejected, handleRejected)
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getOneTransaction.fulfilled, (state, action) => {
        state.selectedTransaction = action.payload;

        state.isLoading = false;
      })
      .addCase(addTransaction.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(editTransaction.fulfilled, state => {
        state.isLoading = false;
      });
  },
});

export const financeReducer = financeSlice.reducer;

export const { updateTotalBalance } = financeSlice.actions;
