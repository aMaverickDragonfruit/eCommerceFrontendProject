import { Button } from 'antd';
import { CartHeader, CartItem, Coupon, Total } from './CartComponents';
import { useSelector } from 'react-redux';
import ServerError from '../../pages/ServerError';
import { useNavigate } from 'react-router-dom';

export default function Cart({ onClose }) {
  const { cart, loading, error } = useSelector((state) => state.cartSlice);
  let {
    _id: cartId,
    products,
    discount,
    coupon,
    tax,
    subtotal,
    estimateTotal,
  } = cart;

  let count = products.reduce((cur, product) => cur + product.quantity, 0);

  if (error) return <ServerError message={error} />;

  const navigate = useNavigate();

  return (
    <>
      <CartHeader
        count={count}
        onClose={onClose}
      />
      <div className=' cart-content box-border bg-white px-6 p-4 pb-8 min-w-96'>
        <div className='overflow-scroll max-h-48'>
          {products.map((product) => (
            <CartItem
              product={product}
              cartId={cartId}
              key={product.product}
            />
          ))}
        </div>
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
          onClick={() => navigate('/checkout')}
        >
          Continue To checkout
        </Button>
      </div>
    </>
  );
}
