import { Input, Layout } from 'antd';
const { Search } = Input;
const { Header } = Layout;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Cart from '../Cart/Cart';
import NavOptions from './NavOptions';

export default function Navbar() {
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div className='relative'>
      <Header className='flex items-center justify-between bg-slate-900 text-slate-50 px-16 pb-4 md:pb-0 w-full h-auto flex-wrap md:flex-nowrap'>
        <Logo
          handleClick={() => navigate('./products')}
          className={`order-1 md:order-1`}
        />
        <Search
          placeholder='Search'
          allowClear
          className='order-3 md:order-2 w-full md:w-1/2'
        />
        <NavOptions
          handleCart={handleCartOpen}
          className={'order-2 md:order-3'}
        />
      </Header>
      {isCartOpen && (
        <>
          <div className='w-96 absolute top-0 right-0 z-50'>
            <Cart onClose={handleCartClose} />
          </div>
          <div
            className='fixed inset-0 bg-slate-500 bg-opacity-50 z-40'
            onClick={handleCartClose}
          ></div>
        </>
      )}
    </div>
  );
}
