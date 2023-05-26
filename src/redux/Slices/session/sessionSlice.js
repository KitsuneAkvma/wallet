import { createSlice } from '@reduxjs/toolkit';
import { logOut, login, refreshUser, signUp } from './operations';

const initialState = {
  user: { id: '', name: '', email: '' },
  loginForm: { email: '', password: '' },
  registerForm: { email: '', password: '', confPassword: '', name: '' },
  token: null,
  isAuth: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const sessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoginEmail: (state, action) => {
      state.loginForm.email = action.payload;
    },
    updateLoginPassword: (state, action) => {
      state.loginForm.password = action.payload;
    },
    updateRegisterEmail: (state, action) => {
      state.registerForm.email = action.payload;
    },
    updateRegisterPassword: (state, action) => {
      state.registerForm.password = action.payload;
    },
    updateRegisterConfPassword: (state, action) => {
      state.registerForm.confPassword = action.payload;
    },
    updateRegisterName: (state, action) => {
      state.registerForm.name = action.payload;
    },
  },
  extraReducers: {
    [signUp.pending]: handlePending,
    [login.pending]: handlePending,
    [logOut.pending]: handlePending,
    [refreshUser.pending](state) {
      state.isRefreshing = true;
    },

    [signUp.rejected]: handleRejected,
    [login.rejected]: handleRejected,
    [logOut.rejected]: handleRejected,
    [refreshUser.rejected](state, action) {
      state.isRefreshing = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    [signUp.fulfilled](state, action) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [login.fulfilled](state, action) {
      state.isLoading = false;

      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled](state) {
      state.isLoading = false;
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.fulfilled](state, action) {
      state.isLoading = false;
      state.user = action.payload;

      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
  },
});

export const {
  updateLoginEmail,
  updateLoginPassword,
  updateRegisterEmail,
  updateRegisterPassword,
  updateRegisterConfPassword,
  updateRegisterName,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
