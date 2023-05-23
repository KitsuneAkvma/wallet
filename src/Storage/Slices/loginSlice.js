import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: { email: '', password: '' },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { updateEmail, updatePassword } = loginSlice.actions;

export const selectEmail = state => state.login.email;
export const selectPassword = state => state.login.password;

export default loginSlice.reducer;
