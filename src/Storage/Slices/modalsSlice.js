import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isTransactModalOpen: false,
    isTransactModalModeIncome: true,
  },
  reducers: {
    switchTransactModal: state => (state.isTransactModalOpen = !state.isTransactModalOpen),
    switchTransactModalMode: state =>
      (state.isTransactModalModeIncome = !state.isTransactModalModeIncome),
  },
});

export const { switchTransactModal, switchTransactModalMode } = modalsSlice.actions;

export const isTransactModalOpen = state => state.modals.isTransactModalOpen;
export const isTransactModalModeIncome = state => state.modals.isTransactModalModeIncome;

export default modalsSlice.reducer;
