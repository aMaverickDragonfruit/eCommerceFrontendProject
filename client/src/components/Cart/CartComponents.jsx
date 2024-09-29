import { CloseOutlined } from '@ant-design/icons';
import { Input, Button, Typography } from 'antd';
const { Text } = Typography;
import NumberEditor from './NumberEditor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/productSlice';
import { useState, useEffect } from 'react';
import { updateCoupon } from '../../features/cartSlice';

const CartHeader = ({ count, onClose }) => {
  return (
    <div className='min-w-96 text-white bg-indigo-500 px-10 pt-5 flex justify-between'>
      <div className='flex'>
        <p className='text-2xl'>Cart</p>
        <p className='text-2xl'>{count}</p>
      </div>
      <CloseOutlined
        className='text-xl text-white hover:text-gray-800 cursor-pointer'
        onClick={onClose}
      />
    </div>
  );
};

const CartItem = ({ product }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const { product: id, quantity } = product;
  const dispatch = useDispatch();
  // console.log(id);
  // console.log(quantity);
  useEffect(() => {
    let isMounted = true; // To prevent setting state if the component is unmounted

    dispatch(fetchProduct(id)).then((action) => {
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
  }, [dispatch, id]);

  return (
    <div className='flex'>
      <img
        src={imgUrl}
        alt=''
        className='w-20 h-20'
      />
      <div>
        <div className='flex justify-between'>
          <p>{name}</p>
          <p>{price}</p>
        </div>
        <div className='flex justify-between'>
          <NumberEditor
            count={quantity}
            productId={id}
          />
          <button>Remove</button>
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
    <>
      <p>Apply Discount Code</p>
      <div className='flex'>
        <Input
          placeholder={'Type your coupon here'}
          onChange={(e) => setUserCoupon(e.target.value)}
        />
        <Button
          type='primary'
          onClick={handleClick}
        >
          Apply
        </Button>
      </div>
      <Text type='secondary'>Applied coupon:</Text>
      {coupon === '20 DOLLAR OFF' && (
        <span>
          <Text
            type='success'
            className='pl-4'
          >
            {coupon}
          </Text>
        </span>
      )}
    </>
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
        <div
          className='flex justify-between'
          key={index}
        >
          <p>{item}</p>
          <p>{amount[index]}</p>
        </div>
      ))}
    </>
  );
};

export { CartHeader, CartItem, Coupon, Total };
