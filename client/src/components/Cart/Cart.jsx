import { Input, Button } from 'antd';
import { useState } from 'react';
import { CartHeader, CartItem, Coupon, Total } from './CartComponents';

export default function Cart() {
  const [count, setCount] = useState(0);
  return (
    <div className='border-2 pb-10 min-w-96'>
      <CartHeader count={count} />
      <CartItem
        imgUrl={
          'https://static.dezeen.com/uploads/2014/09/Apple-iWatch-ss-dezeen_784_02.jpg'
        }
        title={'Apple watch'}
        price={'299'}
      />
      <Coupon />
      <Total />
      <Button type='primary'>Continue To checkout</Button>
    </div>
  );
}
