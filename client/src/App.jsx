import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import PwUpdate from './pages/PwUpdate';
import PwUpdateNoti from './pages/PwUpdateNoti';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetail';
import Testing from './components/testing';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<MainLayout />}
          >
            <Route
              path='signin'
              element={<SignIn />}
            />
            <Route
              path='signup'
              element={<SignUp />}
            />
            <Route
              path='forgot-password'
              element={<PwUpdate />}
            />
            <Route
              path='email-sent'
              element={<PwUpdateNoti />}
            />
            <Route
              path='products'
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path='products/:id'
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path='add-product'
              element={<AddProduct />}
            />
            {/* <Route path='product-detail' element={<DetailCard />} /> */}

            {/* This is testing Route */}
            <Route
              path='testing'
              element={<Testing />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
