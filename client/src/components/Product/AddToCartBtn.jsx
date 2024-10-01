// AddToCartButton.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity, deleteItem } from '../../features/cartSlice';
// import { updateItemQuantity } from '../../../features/cartSlice';

const AddToCartButton = ({ productId }) => {
  const cart = useSelector((state) => state.cartSlice.cart);

  const [found, setFound] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const products = cart?.products || [];
    const found = products.find((product) => product.product === productId);
    setQuantity(found?.quantity);
    setFound(!!found);
  }, [cart?.products, productId]);

  // Handler for adding item to cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      updateItemQuantity({
        cartId: cart._id,
        productId: productId,
        quantity: 1,
      })
    );
    // console.log('add to cart');
  };

  const handleEditQuantity = (e) => {
    e.stopPropagation();
    console.log('edit quantity');
  };

  if (!found)
    return (
      <Button type='primary' onClick={handleAddToCart}>
        Add to Cart
      </Button>
    );

  // Handler for increasing quantity
  const handleIncrease = (e) => {
    e.stopPropagation(); // Prevent the parent button's onClick
    setQuantity(quantity + 1);
    dispatch(
      updateItemQuantity({
        cartId: cart._id,
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };

  // Handler for decreasing quantity
  const handleDecrease = (e) => {
    e.stopPropagation(); // Prevent the parent button's onClick
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(
        updateItemQuantity({
          cartId: cart._id,
          productId: productId,
          quantity: quantity - 1,
        })
      );
    } else {
      // Reset to initial state
      setQuantity(0);
      dispatch(
        deleteItem({
          cartId: cart._id,
          productId: productId,
        })
      );
    }
  };

  return (
    <Button
      type='primary'
      onClick={quantity === 0 ? handleAddToCart : handleEditQuantity}
      className='flex items-center justify-center px-2 w-24'
    >
      <div className='flex items-center justify-between w-full'>
        {/* Decrease Button */}
        <span
          onClick={handleDecrease}
          className='cursor-pointer select-none font-bold text-lg'
        >
          &minus;
        </span>
        {/* Quantity */}
        <span className='flex-grow text-center'>{quantity}</span>
        {/* Increase Button */}
        <span
          onClick={handleIncrease}
          className='cursor-pointer select-none font-bold text-lg'
        >
          &#43;
        </span>
      </div>
    </Button>
  );
};

export default AddToCartButton;
