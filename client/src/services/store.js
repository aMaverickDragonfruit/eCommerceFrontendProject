import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    productSlice: productReducer,
    cartSlice: cartReducer,
  },
});

export default store;
