import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './AdminSlice'

const store = configureStore({
  reducer:{
    admin:adminReducer
  }
});

export default store;