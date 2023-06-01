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
    const res = await axios(`${SERVER_URL}/users/current`).then(
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
    setAuthHeader(res.data.token);

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
const logOut = createAsyncThunk('users/logout', async (authentication, thunkAPI) => {
  const progressToast = toast.loading('Sending...');
  const state = thunkAPI.getState();
  const persistedToken = state.session.token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${persistedToken}`;
  try {
    const res = await axios(`${SERVER_URL}/users/auth/log-out`).then(
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

    return thunkAPI.rejectWithValue(e.message);
  }
});

const getCurrentUser = createAsyncThunk('users/currentUser', async (_, thunkAPI) => {
  const progressToast = toast.loading('Refreshing user...');

  const state = thunkAPI.getState();
  const persistedToken = state.session.token;

  if (persistedToken === null) {
    toast.update(progressToast, {
      render: 'Unable to authenticate 🫢',
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    return thunkAPI.rejectWithValue('Unable to authenticate');
  }
  const axiosConfig = {
    headers: { Authorization: `Bearer ${persistedToken}` },
  };

  try {
    setAuthHeader(persistedToken);
    const res = await axios(`${SERVER_URL}/current}`, axiosConfig).then(
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
export { signUp, login, logOut, getCurrentUser };
