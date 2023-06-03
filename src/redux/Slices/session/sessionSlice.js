import { createSlice } from '@reduxjs/toolkit';
import { logOut, login, refreshUser, signUp } from './operations';

const initialState = {
  user: { id: '', name: '', email: '' },
  loginForm: { email: '', password: '' },
  registerForm: { email: '', password: '', confPassword: '', name: '' },
  transactionForm: { type: '', name: '', amount: '', date: '', category: '', comment: '' },
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
  name: 'session',
  initialState,
  reducers: {
    updateLoginEmail: (state, action) => {
      state.loginForm.email = action.payload;
    },
    updateLoginPassword: (state, action) => {
      state.loginForm.password = action.payload;
    },
    resetLoginForm: state => {
      state.loginForm = initialState.loginForm;
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
    resetRegisterForm: state => {
      state.registerForm = initialState.registerForm;
    },
    updateTransactionType: (state, action) => {
      state.transactionForm.type = action.payload;
    },
    updateTransactionName: (state, action) => {
      state.transactionForm.name = action.payload;
    },
    updateTransactionAmount: (state, action) => {
      state.transactionForm.amount = action.payload;
    },
    updateTransactionDate: (state, action) => {
      state.transactionForm.date = action.payload;
    },
    updateTransactionCategory: (state, action) => {
      state.transactionForm.category = action.payload;
    },
    updateTransactionComment: (state, action) => {
      state.transactionForm.comment = action.payload;
    },
    resetTransactionType: state => {
      state.transactionForm = initialState.transactionForm;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logOut.pending, handlePending)
      .addCase(refreshUser.pending, handlePending)
      .addCase(signUp.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(signUp.fulfilled, state => {
        state.isLoading = false;
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
        state.user = action.payload.data;
        state.isAuth = true;
      });
  },
});

export const {
  updateLoginEmail,
  updateLoginPassword,
  resetLoginForm,
  updateRegisterEmail,
  updateRegisterPassword,
  updateRegisterConfPassword,
  updateRegisterName,
  resetRegisterForm,
  updateTransactionType,
  updateTransactionName,
  updateTransactionAmount,
  updateTransactionDate,
  updateTransactionCategory,
  updateTransactionComment,
  resetTransactionType,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
