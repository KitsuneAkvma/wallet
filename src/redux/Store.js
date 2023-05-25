import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import utilityReducer from './Slices/utilitySlice';

import { authReducer } from './Slices/auth/authSlice';
import persistStore from 'redux-persist/es/persistStore';
import { currenciesReducer } from './Slices/currencies/currenciesSlice';
import { transactionsReducer } from './Slices/transactions/transactionsSlice';

const authPersistConfig = { key: 'auth', storage };

const Store = configureStore({
  reducer: {
    utility: utilityReducer,
    currencies: currenciesReducer,
    transactions: transactionsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
});

export default Store;
export const persistor = persistStore(Store);
