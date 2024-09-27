// AddToCartButton.jsx
import React, { useState } from 'react';
import { Button } from 'antd';

const AddToCartButton = () => {
  const [quantity, setQuantity] = useState(0);

  // Handler for adding item to cart
  const handleAddToCart = () => {
    setQuantity(1);
  };

  // Handler for increasing quantity
  const handleIncrease = (e) => {
    e.stopPropagation(); // Prevent the parent button's onClick
    setQuantity(quantity + 1);
  };

  // Handler for decreasing quantity
  const handleDecrease = (e) => {
    e.stopPropagation(); // Prevent the parent button's onClick
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      // Reset to initial state
      setQuantity(0);
    }
  };

  return (
    <Button
      type='primary'
      onClick={quantity === 0 ? handleAddToCart : null}
      className='flex items-center justify-center px-2 w-24'
    >
      {quantity === 0 ? (
        'Add to Cart'
      ) : (
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
      )}
    </Button>
  );
};

export default AddToCartButton;
