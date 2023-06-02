import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = 'https://waller-api.onrender.com/api/transactions';

const getAllTransactions = createAsyncThunk('finance/getAll', async (_, thunkApi) => {
  try {
    const res = await axios.get(SERVER_URL);
    const transactions = res.data.data.transactions;

    return transactions;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

const getOneTransaction = createAsyncThunk('finance/getOne', async (id, thunkApi) => {
  try {
    const res = await axios.get(`${SERVER_URL}/${id}`);
    const transaction = res.data.data.transaction;

    return transaction;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

const editTransaction = createAsyncThunk('finance/editOne', async (id, credentials, thunkApi) => {
  try {
    const res = await axios.patch(`${SERVER_URL}/${id}`, credentials);
    console.log({ res });
    getAllTransactions();
    return res;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});
export { getAllTransactions, getOneTransaction, editTransaction };
