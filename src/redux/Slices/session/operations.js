import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const SERVER_URL = 'https://waller-api.onrender.com/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
const signUp = createAsyncThunk('users/signup', async (credentials, thunkAPI) => {
  const progressToast = toast.loading('Signing up...');
  try {
    const res = await axios.post(`${SERVER_URL}/users/auth/sign-up`, credentials).then(
      toast.update(progressToast, {
        render: 'Thank you for joining us ✨',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
    const user = res.data.data.newUser;
    setAuthHeader(user.token);
    console.log(res.data);

    return user;
  } catch (err) {
    toast.update(progressToast, {
      render: 'Something went wrong 😭',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    return thunkAPI.rejectWithValue(err.message);
  }
});

const login = createAsyncThunk('users/login', async (credentials, thunkAPI) => {
  const progressToast = toast.loading('Logging in...');

  try {
    const res = await axios.post(`${SERVER_URL}/users/auth/log-in`, credentials).then(
      toast.update(progressToast, {
        render: 'Welcome back 😍',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
    const user = res.data.data;
    setAuthHeader(user.token);

    return user;
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
const logOut = createAsyncThunk('users/logout', async (authentication, thunkAPI) => {
  const progressToast = toast.loading('Sending...');
  try {
    const res = await axios.post(`${SERVER_URL}/users/auth/log-out`).then(
      toast.update(progressToast, {
        render: 'See you soon 😴',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
    clearAuthHeader();
    return res;
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

const refreshUser = createAsyncThunk('users/currentUser', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.session.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Unable to authenticate');
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get(`${SERVER_URL}/users/current`);

    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
export { setAuthHeader, clearAuthHeader };
export { signUp, login, logOut, refreshUser };
