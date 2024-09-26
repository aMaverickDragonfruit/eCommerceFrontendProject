import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import './index.css';

import store from './services/store.js';
import { getCurrentUser } from './features/userSlice.js';

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(getCurrentUser(jwtDecode(token)));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
