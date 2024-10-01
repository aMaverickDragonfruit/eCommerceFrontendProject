import { CloseOutlined } from '@ant-design/icons';
import { Input, Button, Typography } from 'antd';
const { Text } = Typography;
import NumberEditor from './NumberEditor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/productSlice';
import { useState, useEffect } from 'react';
import { updateCoupon, deleteItem } from '../../features/cartSlice';

const CartHeader = ({ count, onClose }) => {
  return (
    <div className='box-border text-white bg-indigo-600 px-6 py-3 flex justify-between'>
      <div className='flex'>
        <p className='text-2xl'>Cart&nbsp;</p>
        <p className='text-2xl'>{count}</p>
      </div>
      <CloseOutlined
        className='text-xl text-white hover:text-gray-800 cursor-pointer'
        onClick={onClose}
      />
    </div>
  );
};

const CartItem = ({ cartId, product }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const { product: productId, quantity } = product;
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true; // To prevent setting state if the component is unmounted

    dispatch(fetchProduct(productId)).then((action) => {
      if (fetchProduct.fulfilled.match(action)) {
        if (isMounted) {
          const { name, price, imgUrl } = action.payload;
          setName(name);
          setPrice(price);
          setImgUrl(imgUrl);
        }
      } else if (fetchProduct.rejected.match(action)) {
        console.error('Error fetching product:', action.payload);
      }
    });

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [dispatch, productId]);

  const handleRemoveItem = () => {
    dispatch(deleteItem({ cartId: cartId, productId: productId }));
  };

  return (
    <div className='cart-item box-border py-2 flex w-full justify-between'>
      <img src={imgUrl} alt='' className='w-20 h-20 object-contain' />
      <div className='item-info w-2/3 flex flex-col justify-between'>
        <div className='flex justify-between'>
          <p>{name}</p>
          <p>{price}</p>
        </div>
        <div className='flex justify-between'>
          <NumberEditor count={quantity} productId={productId} />
          <Button type='link' className='underline' onClick={handleRemoveItem}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

const Coupon = ({ coupon }) => {
  const [userCoupon, setUserCoupon] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(updateCoupon({ id: cart._id, coupon: userCoupon }));
  };
  return (
    <div className='box-border py-4'>
      <p>Apply Discount Code</p>
      {/* coupon input */}
      <div className='py-2 flex gap-2 justify-between'>
        <Input
          placeholder={'Type your coupon here'}
          onChange={(e) => setUserCoupon(e.target.value)}
        />
        <Button type='primary' onClick={handleClick}>
          Apply
        </Button>
      </div>
      <Text type='secondary'>Applied coupon:</Text>
      {/* show valid coupon in the account */}
      {coupon === '20 DOLLAR OFF' && (
        <span>
          <Text type='success' className='pl-4'>
            {coupon}
          </Text>
        </span>
      )}
    </div>
  );
};

const Total = ({ discount, coupon, tax, subtotal, estimateTotal }) => {
  const amount = [
    `$${subtotal}`,
    `$${tax}`,
    `-$${discount}`,
    `$${estimateTotal}`,
  ];
  return (
    <>
      {['Subtotal', 'Tax', 'Discount', 'Estimated total'].map((item, index) => (
        <div className='flex justify-between pt-2' key={index}>
          <p className='font-semibold'>{item}</p>
          <p>{amount[index]}</p>
        </div>
      ))}
    </>
  );
};

export { CartHeader, CartItem, Coupon, Total };
