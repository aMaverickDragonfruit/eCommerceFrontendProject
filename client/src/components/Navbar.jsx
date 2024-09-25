import { Input } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Search } = Input;

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [amount, setAmount] = useState(0);
  return (
    <nav className='flex flex-row bg-slate-800 text-slate-50 px-16 py-4 w-auto'>
      <span className=' text-xl font-bold mr-10'>
        Management <span className='text-sm'>&nbsp;chuwa</span>
      </span>
      <Search
        placeholder='Search'
        allowClear
        className='w-1/3 basis-1/2 mr-10'
      />
      <div className='flex gap-5'>
        <div className=''>
          <UserOutlined className='text-xl mr-2' />
          <span>{isLogin ? 'Sign out' : 'Sign in'}</span>
        </div>
        <div className=''>
          <ShoppingCartOutlined className='text-2xl mr-2' />
          <span>{amount}</span>
        </div>
      </div>
    </nav>
  );
}
