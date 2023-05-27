import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const getFinanceData = createAsyncThunk((userID, thunkAPI) => {
  const progressToast = toast.loading('Loading...');
  try {
    axios.get(userID).then(
      toast.update(progressToast, {
        render: 'Successfully got transactions data!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      }),
    );
  } catch (e) {
    toast.update(progressToast, {
      render: 'Problem with downloading transactions 😭',
      type: 'success',
      isLoading: false,
      autoClose: 1000,
    });
    return thunkAPI.rejectWithValue(e.message);
  }
});

export { getFinanceData };
