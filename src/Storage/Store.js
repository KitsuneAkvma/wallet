import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Slices/loginSlice';
import registerReducer from './Slices/registerSlice';
import utilityReducer from './Slices/utilitySlice';
import userReducer from './Slices/userSlice';
const Store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    utility: utilityReducer,
    currentUser: userReducer,
  },
});

export default Store;
