import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = 'https://waller-api.onrender.com/api/transactions';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Nzc5OTY3YmQ4Yjc3NmM5NjAxZjA0YyIsImlhdCI6MTY4NTYzNjI3NywiZXhwIjoxNjg1NzIyNjc3fQ.DwWbs06VDbRxYgPP0OiF4li2yPCswgBOVVwWI8liZ7k';
const axiosConfig = {
  headers: { Authorization: `Bearer ${token}` },
};
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

const getAllTransactions = createAsyncThunk('finance/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(SERVER_URL, axiosConfig);
    const transactions = res.data.data.transactions;


    return transactions;
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export { getAllTransactions };
