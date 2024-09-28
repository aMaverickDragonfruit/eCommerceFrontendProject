import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  cart: {},
  loading: false,
  error: null,
};

// Async thunk actions
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/carts/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createCart = createAsyncThunk(
  'cart/createCart',
  async (userId, { rejectWithValue }) => {
    const body = { userId: userId };
    try {
      const response = await api.post('api/carts', body);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (data, { rejectWithValue }) => {
    const { body, id } = data;
    try {
      const response = await api.put(`/api/carts/${id}`, body);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch cart by id
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      //create cart
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      //update cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;
