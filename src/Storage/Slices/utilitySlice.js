import { createSlice } from '@reduxjs/toolkit';

export const utilitySlice = createSlice({
  name: 'utility',
  initialState: {
    isTransactModalOpen: false,
    isTransactModalModeIncome: true,
    isLogoutModalOpen: false,
    isLoading: false,
  },
  reducers: {
    switchTransactModal: state => (state.isTransactModalOpen = !state.isTransactModalOpen),
    switchTransactModalMode: state =>
      (state.isTransactModalModeIncome = !state.isTransactModalModeIncome),
  },
  switchLogoutModal: state => (state.isLogoutModalOpen = !state.isLogoutModalOpen),
  switchIsLoading: state => (state.isLoading = !state.isLoading),
});

export const { switchTransactModal, switchTransactModalMode, switchLogoutModal, switchIsLoading } =
  utilitySlice.actions;

export const isTransactModalOpen = state => state.utility.isTransactModalOpen;
export const isTransactModalModeIncome = state => state.utility.isTransactModalModeIncome;
export const isLogoutModalOpen = state => state.utility.isLogoutModalOpen;
export const isLoading = state => state.utility.isLoading;

export default utilitySlice.reducer;
