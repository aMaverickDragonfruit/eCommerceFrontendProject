import { Button } from 'antd';
import { CartHeader, CartItem, Coupon, Total } from './CartComponents';
import { useSelector } from 'react-redux';

export default function Cart({ onClose }) {
  const { cart } = useSelector((state) => state.cartSlice);
  let { products, discount, coupon, tax, subtotal, estimateTotal } = cart;
  let count = products.reduce((cur, product) => cur + product.quantity, 0);

  // const {}

  return (
    <div className='border-2 pb-10 min-w-96'>
      <CartHeader count={count} onClose={onClose} />
      {products.map((product) => (
        <CartItem product={product} key={product.product} />
      ))}
      <Coupon coupon={coupon} />
      <Total
        discount={discount}
        coupon={coupon}
        tax={tax}
        subtotal={subtotal}
        estimateTotal={estimateTotal}
      />
      <Button type='primary'>Continue To checkout</Button>
    </div>
  );
}
