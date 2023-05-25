import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
const signUp = createAsyncThunk('auth/signup', async (credentials, thunkApi) => {
  const progressToast = toast.loading('Signing up...');
  try {
    const res = await axios('https://dummyjson.com/products/1').then(
      toast.update(progressToast, {
        render: 'Thank you for joining us ✨',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
    setAuthHeader(res.data.token);

    return res.data;
  } catch (err) {
    toast.update(progressToast, {
      render: 'Something went wrong 😭',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    return thunkApi.rejectWithValue(err.message);
  }
});

const login = createAsyncThunk('auth/login', async (credentials, thunkApi) => {
  const progressToast = toast.loading('Logging in...');

  try {
    const res = await axios('https://dummyjson.com/products/2').then(
      toast.update(progressToast, {
        render: 'Welcome back 😍',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
    setAuthHeader(res.data.token);

    return res.data;
  } catch (e) {
    toast.update(progressToast, {
      render: 'Something went wrong 😭',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });

    return thunkApi.rejectWithValue(e.message);
  }
});
const logOut = createAsyncThunk('auth/Logout', async (authentication, thunkApi) => {
  const progressToast = toast.loading('Sending...');

  try {
    const res = await axios('https://dummyjson.com/products/4').then(
      toast.update(progressToast, {
        render: 'See you soon 😴',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
    clearAuthHeader();
    return res.data;
  } catch (e) {
    toast.update(progressToast, {
      render: 'Something went wrong 😭',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });

    return thunkApi.rejectWithValue(e.message);
  }
});

const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  const progressToast = toast.loading('Refreshing user...');

  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    toast.update(progressToast, {
      render: 'Unable to authenticate 🫢',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    return thunkAPI.rejectWithValue('Unable to authenticate');
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios('https://dummyjson.com/products/4').then(
      toast.update(progressToast, {
        render: 'Successfully Refreshed! ✌️',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );

    return res.data;
  } catch (e) {
    toast.update(progressToast, {
      render: 'Something went wrong 😭',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    return thunkAPI.rejectWithValue(e.message);
  }
});
export { setAuthHeader, clearAuthHeader };
export { signUp, login, logOut, refreshUser };
