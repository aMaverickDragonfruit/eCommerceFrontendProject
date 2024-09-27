import { CloseOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import NumberEditor from './NumberEditor';

const CartHeader = ({ count }) => {
  return (
    <div className='min-w-96 text-white bg-indigo-500 px-10 pt-5 flex justify-between'>
      <div className='flex'>
        <p className='text-2xl'>Cart</p>
        <p className='text-2xl'>{count}</p>
      </div>
      <CloseOutlined
        className='text-xl text-white hover:text-gray-800 cursor-pointer'
        // onClick={onClose}
      />
    </div>
  );
};

const CartItem = ({ imgUrl, title, price }) => {
  return (
    <div className='flex'>
      <img
        src={imgUrl}
        alt=''
        className='w-20 h-20'
      />
      <div>
        <div className='flex justify-between'>
          <p>{title}</p>
          <p>{price}</p>
        </div>
        <div className='flex justify-between'>
          <NumberEditor />
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

const Coupon = () => {
  return (
    <>
      <p>Apply Discount Code</p>
      <div className='flex'>
        <Input />
        <Button type='primary'>Apply</Button>
      </div>
    </>
  );
};

const Total = () => {
  const amount = ['$99', '$99', '$20', '$178'];
  return (
    <>
      {['Subtotal', 'Tax', 'Discount', 'Estimated total'].map((item, index) => (
        <div className='flex justify-between'>
          <p>{item}</p>
          <p>{amount[index]}</p>
        </div>
      ))}
    </>
  );
};

export { CartHeader, CartItem, Coupon, Total };
