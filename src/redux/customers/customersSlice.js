import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/customers';

export const FetchAllCustomers = createAsyncThunk('Fetch all customers', async () => {
  const response = await axios(url);
  const customers = response.data;
  console.log(customers);
});

// export const createCustomer = createAsyncThunk('Create a new customer', async (name) => {
//   await axios.post(url, {
//     name,
//   })
//     .then((response) => {
//       console.log(`${response} mambo iko sawa`);
//     });
// });

const initialState = {
  customers: [],
  isLoading: false,
};

const customersSlice = createSlice({
  name: 'All customers',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(FetchAllCustomers.rejected, (state) => {
        state.isLoading = false;
        state.customers = [];
      });
  },
});

export default customersSlice.reducer;
