import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import Page403 from '../pages/Page403';

export default function ProtectedOwnerRoute({ children }) {
  const token = useMemo(() => localStorage.getItem('token'), []);
  const location = useLocation();

  let { id: productId } = useParams();
  console.log(productId);

  if (!token) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const { user, exp } = decoded;
    const { products } = user;

    const isOwner = products.includes(productId);

    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to='/signin' state={{ from: location }} replace />;
    }

    if (user.isVender && isOwner) {
      return <>{children}</>;
    } else {
      return <Page403 />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }
}
