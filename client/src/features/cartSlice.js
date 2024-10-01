import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { act } from 'react';

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
    const body = {
      products: [],
      userId: userId,
      coupon: '',
      discount: 0,
      subtotal: 0,
      tax: 0,
      estimateTotal: 0,
    };
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

export const updateCoupon = createAsyncThunk(
  'cart/updateCoupon',
  async (data, { getState, rejectWithValue }) => {
    const { id, coupon } = data;
    const discount = coupon === '20 DOLLAR OFF' ? 20 : 0;
    const state = getState();
    const cart = state.cartSlice.cart;
    const estimateTotal = Math.max(0, cart.subtotal + cart.tax - discount);
    console.log(estimateTotal);

    try {
      const response = await api.put(`/api/carts/${id}`, {
        coupon: coupon,
        discount: discount,
        estimateTotal: estimateTotal,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'cart/deleteItem',
  async (data, { getState, rejectWithValue }) => {
    const { cartId, productId } = data;
    const state = getState();
    const cart = state.cartSlice.cart;
    const products = state.productSlice.products;

    const productPriceMap = new Map();
    products.forEach((product) => {
      productPriceMap.set(product._id, product.price);
    });

    const { products: cartItems } = cart;

    // console.log(`cart id: ${cartId}`);
    // console.log(`product id: ${productId}`);

    const updatedCartItems = cartItems.filter(
      (product) => product.product !== productId
    );
    // console.log(updatedCartItems);

    const subtotal = updatedCartItems.reduce(
      (cur, proudct) =>
        cur + proudct.quantity * productPriceMap.get(proudct.product),
      0
    );

    const tax = Math.floor(0.095 * subtotal * 100) / 100;

    const estimateTotal = Math.max(0, subtotal + tax - cart.discount);

    // console.log(
    //   `subtotal: ${subtotal}, tax: ${tax}, estimateTotal: ${estimateTotal}`
    // );
    try {
      const response = await api.put(`/api/carts/${cartId}`, {
        products: updatedCartItems,
        subtotal: subtotal,
        tax: tax,
        estimateTotal: estimateTotal,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async (data, { getState, rejectWithValue }) => {
    try {
      const { cartId, productId, quantity } = data;
      let updatedCartProducts = {};
      const state = getState();

      const cart = state.cartSlice.cart;
      const products = state.productSlice.products;

      // console.log(cart);

      const productPriceMap = new Map();
      products.forEach((product) => {
        productPriceMap.set(product._id, product.price);
      });

      const found = !!cart.products.find(
        (product) => product.product === productId
      );
      if (found) {
        updatedCartProducts = cart.products.map((product) =>
          product.product === productId ? { ...product, quantity } : product
        );
      } else {
        updatedCartProducts = [
          ...cart.products,
          { product: productId, quantity: quantity },
        ];
      }

      // console.log(updatedCartProducts);

      const subtotal = updatedCartProducts.reduce(
        (cur, proudct) =>
          cur + proudct.quantity * productPriceMap.get(proudct.product),
        0
      );

      // console.log(`subtotal:${subtotal}`);

      const tax = Math.floor(0.095 * subtotal * 100) / 100;

      // console.log(`tax:${tax}`);

      const estimateTotal = Math.max(0, subtotal + tax - cart.discount);

      // console.log(`estimateTotal:${estimateTotal}`);

      const response = await api.put(`/api/carts/${cartId}`, {
        products: updatedCartProducts,
        subtotal: subtotal,
        tax: tax,
        estimateTotal: estimateTotal,
      });
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
      //update Cart coupon
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      //update cart item quantity
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      //delete Car Item
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;
