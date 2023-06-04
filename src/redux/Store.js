import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

import { sessionReducer } from './Slices/session/sessionSlice';
import { financeReducer } from './Slices/finance/financeSlice';
import { globalReducer } from './Slices/global/globalSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const sessionPersistConfig = { key: 'session', storage };

const Store = configureStore({
  reducer: {
    global: globalReducer,
    finance: financeReducer,
    session: persistReducer(sessionPersistConfig, sessionReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'finance/editOne/fulfilled',
        ],
      },
    }),
});

export default Store;
export const persistor = persistStore(Store);
