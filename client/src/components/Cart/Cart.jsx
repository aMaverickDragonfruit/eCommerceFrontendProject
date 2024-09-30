import { Button } from 'antd';
import { CartHeader, CartItem, Coupon, Total } from './CartComponents';
import { useSelector } from 'react-redux';

export default function Cart({ onClose }) {
  const { cart } = useSelector((state) => state.cartSlice);
  let { products, discount, coupon, tax, subtotal, estimateTotal } = cart;
  let count = products.reduce((cur, product) => cur + product.quantity, 0);

  // const {}

  return (
    <>
      <CartHeader
        count={count}
        onClose={onClose}
      />
      <div className='cart-content box-border bg-white px-6 p-4 pb-8 min-w-96'>
        {products.map((product) => (
          <CartItem
            product={product}
            key={product.product}
          />
        ))}
        <Coupon coupon={coupon} />
        <hr className='pb-2' />
        <Total
          discount={discount}
          coupon={coupon}
          tax={tax}
          subtotal={subtotal}
          estimateTotal={estimateTotal}
        />
        <Button
          type='primary'
          className='w-full mt-4'
        >
          Continue To checkout
        </Button>
      </div>
    </>
  );
}
