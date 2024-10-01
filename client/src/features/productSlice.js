import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { act } from 'react';

const initialState = {
  products: [],
  curProduct: {},
  loading: false,
  error: null,
};

// Async thunk actions
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCurrentProduct = createAsyncThunk(
  'products/fetchCurrentProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data, { getState, rejectWithValue }) => {
    const state = getState();
    const products = state.productSlice.products;
    try {
      const response = await api.post('/api/products', data);
      const newProduct = response.data;
      const updatedProducts = [...products, newProduct];
      return updatedProducts;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data, { getState, rejectWithValue }) => {
    const { productId, productInfo } = data;
    const state = getState();
    const products = state.productSlice.products;
    try {
      const response = await api.put(`/api/products/${productId}`, productInfo);
      const updatedProduct = response.data;
      const updateProducts = products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      return updateProducts;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteCurProduct: (state) => {
      state.curProduct = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // fetch product by id
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // fetch current product by id
      .addCase(fetchCurrentProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProduct = action.payload;
      })
      .addCase(fetchCurrentProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { deleteCurProduct } = productSlice.actions;
export default productSlice.reducer;
