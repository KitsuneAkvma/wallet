import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'currentUser',
  initialState: { email: '', firstName: '' },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateName: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export const { updateEmail, updateName } = userSlice.actions;

export const selectEmail = state => state.login.email;
export const selectFirstName = state => state.login.firstName;

export default userSlice.reducer;
