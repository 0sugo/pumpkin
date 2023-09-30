import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  try {
    const response = await axios('http://localhost:3000/api/v1/products');
    return response.data.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  products: [],
  isLoading: false,
  error: '',
};
const productsSlice = createSlice({
  name: 'All products',
  initialState,
  reducers: {
    addproduct: (state, action) => {
      state.products.push(action.payload);
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = true;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.error.message;
      });
  },
});
export default productsSlice.reducer;
