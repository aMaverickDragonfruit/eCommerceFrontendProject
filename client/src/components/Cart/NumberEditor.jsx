import { useState } from 'react';

export default function NumberEditor() {
  const [quantity, setQuantity] = useState(1);
  // Handler for increasing quantity
  const handleIncrease = (e) => {
    // e.stopPropagation(); // Prevent the parent button's onClick
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
    <div className='border-2 w-20 flex items-center justify-between w-full'>
      {/* Decrease Button */}
      <span
        onClick={handleDecrease}
        className='w-6 text-center cursor-pointer select-none font-bold text-lg'
      >
        &minus;
      </span>
      {/* Quantity */}
      <span className='border-x-2 flex-grow text-center'>{quantity}</span>
      {/* Increase Button */}
      <span
        onClick={handleIncrease}
        className='w-6 text-center cursor-pointer select-none font-bold text-lg'
      >
        &#43;
      </span>
    </div>
  );
}
