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

export default function Navbar() {
  const [amount, setAmount] = useState(0);

  const { isAuthenticated } = useSelector((state) => state.userSlice);
  // const { cart } = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
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
        <div>
          <ShoppingCartOutlined className='text-2xl mr-2' />
          {isAuthenticated ? <span>0</span> : <span>{amount}</span>}
        </div>
      </div>
    </Header>
  );
}
