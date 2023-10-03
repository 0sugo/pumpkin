import { configureStore } from '@reduxjs/toolkit';
import productsSliceReducer from './Products/productsSlice';
import customersSliceReducer from './customers/customersSlice';

const store = configureStore({
  reducer: {
    allProducts: productsSliceReducer,
    allCustomers: customersSliceReducer,
  },
});

export default store;
