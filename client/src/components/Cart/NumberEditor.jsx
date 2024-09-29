import { useSelector, useDispatch } from 'react-redux';
import { updateItemQuantity } from '../../features/cartSlice';

export default function NumberEditor({ count, productId }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);
  // Handler for increasing quantity
  const handleIncrease = (e) => {
    e.stopPropagation(); // Prevent the parent button's onClick
    dispatch(
      updateItemQuantity({
        cartId: cart._id,
        productId: productId,
        quantity: count + 1,
      })
    );
  };
  // Handler for decreasing quantity
  const handleDecrease = (e) => {
    e.stopPropagation(); // Prevent the parent button's onClick
    if (count > 1) {
      dispatch(
        updateItemQuantity({
          cartId: cart._id,
          productId: productId,
          quantity: count - 1,
        })
      );
    } else {
      // Reset to initial state
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
      <span className='border-x-2 flex-grow text-center'>{count}</span>
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
