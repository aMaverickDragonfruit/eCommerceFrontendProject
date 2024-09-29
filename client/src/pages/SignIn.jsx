import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { fetchUser } from '../features/userSlice';
import { fetchCart } from '../features/cartSlice';
import { useState } from 'react';

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
            navigate(from, { replace: true });
          } else if (fetchCart.rejected.match(action)) {
            console.log(action.payload);
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
    <div className='box-content w-96 border-2 rounded-md px-10 py-12 shadow-md'>
      {err ? <p>{err}</p> : <></>}
      <AuthForm
        buttonText='Sign In'
        onSubmit={onSubmit}
        onClose={onClosed}
        title='Sign in to your account'
        fields={fields}
      />

      <div className='flex justify-between'>
        <p>
          Don&apos;t have an account? <Link to='/signup'>Sign up</Link>
        </p>
        <Link to='/forgot-password'>Forgot password?</Link>
      </div>
    </div>
  );
}
