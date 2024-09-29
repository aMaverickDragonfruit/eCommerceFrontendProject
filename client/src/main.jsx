import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import './index.css';

import store from './services/store.js';
import { getCurrentUser } from './features/userSlice.js';
import { fetchCart } from './features/cartSlice.js';
import { fetchProducts } from './features/productSlice';

const token = localStorage.getItem('token');
if (token) {
  const jwtPayload = jwtDecode(token);
  store.dispatch(getCurrentUser(jwtPayload));
  const cartId = jwtPayload.user.cart;
  store.dispatch(fetchCart(cartId));
}
store.dispatch(fetchProducts());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
