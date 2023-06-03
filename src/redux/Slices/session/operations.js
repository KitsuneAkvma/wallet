import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const SERVER_URL = 'https://waller-api.onrender.com/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  delete axios.defaults.headers.authorization;
};

const signUp = createAsyncThunk('users/signup', async (credentials, thunkAPI) => {
  const progressToast = toast.loading('Signing up...');
  try {
    const res = await axios.post(`${SERVER_URL}/users/auth/sign-up`, credentials);
    const user = res.data.data.newUser;

    toast.update(progressToast, {
      render: 'Thank you for joining us ✨ Please check your email to verify your account',
      type: 'success',
      isLoading: false,
      autoClose: 1000,
    });

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
    const res = await axios.post(`${SERVER_URL}/users/auth/log-in`, credentials);
    const user = res.data.data;
    console.log(res.data.data);

    setAuthHeader(user.token);
    toast.update(progressToast, {
      render: 'Welcome back 😍',
      type: 'success',
      isLoading: false,
      autoClose: 1000,
    });
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

const logOut = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  const progressToast = toast.loading('Logging out...');

  try {
    await axios.post(`${SERVER_URL}/users/auth/log-out`);
    clearAuthHeader();
    toast.update(progressToast, {
      render: 'See you soon 😴',
      type: 'success',
      isLoading: false,
      autoClose: 2000,
    });
  } catch (e) {
    clearAuthHeader();

    toast.update(progressToast, {
      render: 'See you soon 😴',
      type: 'success',
      isLoading: false,
      autoClose: 2000,
    });
    thunkAPI.dispatch(refreshUser());
    return thunkAPI.rejectWithValue(e.message);
  }
});

const refreshUser = createAsyncThunk('users/currentUser', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const { token } = state.session;
  if (!token) {
    return thunkAPI.rejectWithValue('Unable to authenticate');
  }

  try {
    const response = await axios.get(`${SERVER_URL}/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;

    if (!user) {
      return thunkAPI.rejectWithValue('Unable to authenticate');
    }

    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { setAuthHeader, clearAuthHeader };
export { signUp, login, logOut, refreshUser };
