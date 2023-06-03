import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
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
  reducers: {
    updateSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTransactions.pending, handlePending)
      .addCase(getOneTransaction.pending, handlePending)
      .addCase(addTransaction.pending, handlePending)
      .addCase(editTransaction.pending, handlePending)
      .addCase(deleteTransaction.pending, handlePending)

      .addCase(getAllTransactions.rejected, handleRejected)
      .addCase(getOneTransaction.rejected, handleRejected)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(editTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.rejected, handleRejected)

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
      })
      .addCase(deleteTransaction.fulfilled, state => {
        state.isLoading = false;
      });
  },
});

export const financeReducer = financeSlice.reducer;

export const { updateSelectedTransaction } = financeSlice.actions;
