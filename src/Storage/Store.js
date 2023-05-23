import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Slices/loginSlice';
import registerReducer from './Slices/registerSlice';
import modalsReducer from './Slices/modalsSlice';

const Store = configureStore({
  reducer: { login: loginReducer, register: registerReducer, modals: modalsReducer },
});

export default Store;
