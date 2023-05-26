import { createSlice } from '@reduxjs/toolkit';
import { getFinanceData } from './operations';

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
  reducers: {
    updateTotalBalance: (state, action) => {
      state.totalBalance = action.payload;
    },
  },
  extraReducers: {
    [getFinanceData.pending]: handlePending,
    [getFinanceData.rejected]: handleRejected,
    [getFinanceData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const financeReducer = financeSlice.reducer;

export const { updateTotalBalance } = financeSlice.actions;
