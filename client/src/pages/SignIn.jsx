import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { fetchUser } from '../features/userSlice';
import { fetchCart } from '../features/cartSlice';
import { useState } from 'react';
import { Alert } from 'antd';
import { fetchProducts } from '../features/productSlice';

export default function LogIn() {
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password',
    },
  ];

  const onSubmit = (data) => {
    dispatch(fetchUser(data)).then((action) => {
      if (fetchUser.fulfilled.match(action)) {
        dispatch(fetchCart(action.payload.user.cart)).then((action) => {
          if (fetchCart.fulfilled.match(action)) {
            dispatch(fetchProducts()).then((action) => {
              if (fetchProducts.fulfilled.match(action)) {
                navigate(from, { replace: true });
              } else if (fetchProducts.rejected.match(action)) {
                setErr(action.payload);
              }
            });
          } else if (fetchCart.rejected.match(action)) {
            setErr(action.payload);
          }
        });
      } else if (fetchUser.rejected.match(action)) {
        setErr(action.payload);
      }
    });
  };

  const onClosed = () => {
    console.log('closed');
  };

  return (
    <div className='box-content h-fit mt-8 md:mt-20 md:w-96 border-2 rounded-md px-10 py-12 shadow-md'>
      <AuthForm
        buttonText='Sign In'
        onSubmit={onSubmit}
        onClose={onClosed}
        title='Sign in to your account'
        fields={fields}
      />
      {err ? (
        <Alert message={err} type='error' showIcon className='mb-4' />
      ) : (
        <></>
      )}
      <div className='flex flex-col md:flex-row items-center md:justify-between'>
        <p>
          Don&apos;t have an account?{' '}
          <span
            className='text-indigo-500 cursor-pointer'
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
        {/* <Link to='/forgot-password'>Forgot password?</Link> */}
        <p
          className='text-indigo-500 cursor-pointer'
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password?
        </p>
      </div>
    </div>
  );
}
