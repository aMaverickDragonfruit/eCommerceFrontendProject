import { Input, Layout } from 'antd';
const { Search } = Input;
const { Header } = Layout;
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../features/userSlice';
import Logo from './Logo';
import Cart from './Cart/Cart';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const hanldeCartClose = () => {
    setIsCartOpen(false);
  };

  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const { cart } = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <Header className='flex items-center bg-slate-800 text-slate-50 px-16 py-4 w-auto'>
        <Logo />
        <Search
          placeholder='Search'
          allowClear
          className='w-1/3 basis-1/2 mr-10'
        />
        <div className='flex gap-4'>
          <div>
            <UserOutlined className='text-xl mr-2' />
            {isAuthenticated ? (
              <span onClick={() => dispatch(signOutUser())}>Sign out</span>
            ) : (
              <span onClick={() => navigate('/signin')}>Sign in</span>
            )}
          </div>
          <div onClick={handleCartOpen}>
            <ShoppingCartOutlined className='text-2xl mr-2' />
            {isAuthenticated ? <span>{cart.subtotal}</span> : <span>0</span>}
          </div>
        </div>
      </Header>
      {isCartOpen && (
        <div className='w-96'>
          <Cart onClose={hanldeCartClose} />
        </div>
      )}
    </div>
  );
}
