import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateIsModalLogoutOpen: (state, action) => {
      state.isModalLogoutOpen = action.payload;
    },
    updateIsModalAddTransactionOpen: (state, action) => {
      state.isModalAddTransactionOpen = action.payload;
    },
    updateIsModalEditTransactionOpen: (state, action) => {
      state.isModalEditTransactionOpen = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;

export const { updateIsLoading, updateIsModalLogoutOpen, updateIsModalAddTransactionOpen, updateIsModalEditTransactionOpen } =
  globalSlice.actions;
