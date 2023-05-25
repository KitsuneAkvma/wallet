import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const getCurrencies = createAsyncThunk('currencies/getCurrencies', async (_, thunkApi) => {
  const progressToast = toast.loading('Downloading currencies...');
  try {
    const res = await axios('https://dummyjson.com/products/').then(
      toast.update(progressToast, {
        render: 'Success 💲',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
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

export { getCurrencies };
