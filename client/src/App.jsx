import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import PwUpdate from './pages/PwUpdate';
import PwUpdateNoti from './pages/PwUpdateNoti';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
