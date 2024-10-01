import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../features/productSlice';

import Page403 from '../pages/Page403';

export default function ProtectedOwnerRoute({ children }) {
  const dispatch = useDispatch();
  const token = useMemo(() => localStorage.getItem('token'), []);
  const location = useLocation();
  let { id: productId } = useParams();

  const [isAuthorized, setIsAuthorized] = useState(null); // null: loading, true: authorized, false: not
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const { user, exp } = decoded;
      const userId = user.id;
      // console.log('User ID from token:', userId);

      const currentTime = Date.now() / 1000;

      if (exp < currentTime) {
        localStorage.removeItem('token');
        setIsExpired(true);
        setIsAuthorized(false);
        return;
      }

      // Fetch the product to get the owner ID
      dispatch(fetchProduct(productId))
        .unwrap()
        .then((product) => {
          const ownerId = product.userId;
          if (userId === ownerId) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setIsAuthorized(false);
        });
    } catch (error) {
      console.error('Error decoding token:', error);
      setIsAuthorized(false);
    }
  }, [dispatch, token, productId]);

  if (isAuthorized === null) {
    return null;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  if (isExpired) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Page403 />;
}
