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
import Page404 from './pages/Page404';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='forgot-password' element={<PwUpdate />} />
            <Route path='email-sent' element={<PwUpdateNoti />} />
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
            <Route path='add-product' element={<AddProduct isEdit={false} />} />
            <Route path='edit/:id' element={<AddProduct isEdit={true} />} />
            <Route path='*' element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
