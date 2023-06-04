import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = 'https://waller-api.onrender.com/api/transactions';
const CATEGORY_URL = 'https://waller-api.onrender.com/api';

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

const addTransaction = createAsyncThunk('finance/addOne', async (credentials, thunkApi) => {
  try {
    const res = await axios.post(`${SERVER_URL}/`, credentials);

    thunkApi.dispatch(getAllTransactions());
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

const editTransaction = createAsyncThunk('finance/editOne', async (credentials, thunkApi) => {
  const id = credentials.id;
  try {
    const res = await axios.patch(`${SERVER_URL}/${id}`, credentials);

    thunkApi.dispatch(getAllTransactions());

    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

const deleteTransaction = createAsyncThunk('finance/deleteOne', async (id, thunkApi) => {
  try {
    const res = await axios.delete(`${SERVER_URL}/${id}`);

    thunkApi.dispatch(getAllTransactions());

    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

const fetchCategories = createAsyncThunk('finance/fetchCategories', async (_, thunkApi) => {
  try {
    const res = await axios.get(`${CATEGORY_URL}/transaction-categories`);
    const categories = res.data.data.allCategories;

    return categories;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

export {
  getAllTransactions,
  getOneTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
  fetchCategories,
};
