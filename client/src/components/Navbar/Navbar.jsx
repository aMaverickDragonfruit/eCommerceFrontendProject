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
    <div>
      <Header className='flex items-center justify-between bg-slate-800 text-slate-50 px-16 py-4 w-full h-auto flex-wrap md:flex-nowrap'>
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
        <div className='w-96'>
          <Cart onClose={handleCartClose} />
        </div>
      )}
    </div>
  );
}
