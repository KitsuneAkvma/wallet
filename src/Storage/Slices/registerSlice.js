import { createSlice } from '@reduxjs/toolkit';


export const registerSlice = createSlice({
  name: 'register',
  initialState: { email: 'du', password: 'uu', confPassword: 'p', firstName: 'a' },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updateConfPassword: (state, action) => {
      state.confPassword = action.payload;
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export const { updateEmail, updatePassword, updateConfPassword, updateFirstName } =
  registerSlice.actions;

export const selectEmail = state => state.register.email;
export const selectPassword = state => state.register.password;
export const selectConfPassword = state => state.register.confPassword;
export const selectFirstName = state => state.register.firstName;

export default registerSlice.reducer;
