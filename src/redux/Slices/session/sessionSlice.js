import { createSlice } from '@reduxjs/toolkit';
import { logOut, login, refreshUser, signUp } from './operations';

const initialState = {
  user: { id: '', name: '', email: '' },
  loginForm: { email: '', password: '' },
  registerForm: { email: '', password: '', confPassword: '', name: '' },
  token: null,
  isAuth: true,
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
  name: 'session',
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
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logOut.pending, handlePending)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isAuth = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isRefreshing = false;
      });
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
