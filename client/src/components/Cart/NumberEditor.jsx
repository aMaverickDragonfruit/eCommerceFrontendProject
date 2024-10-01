import { useSelector, useDispatch } from 'react-redux';
import { updateItemQuantity, deleteItem } from '../../features/cartSlice';

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
      dispatch(
        deleteItem({
          cartId: cart._id,
          productId: productId,
        })
      );
    }
  };
  return (
    <table className='border-2 w-1/2 text-center '>
      <tbody>
        <tr>
          <td className='cursor-pointer' onClick={handleDecrease}>
            &minus;
          </td>
          <td className='border-l-2 border-r-2'>{count}</td>
          <td className='cursor-pointer' onClick={handleIncrease}>
            &#43;
          </td>
        </tr>
      </tbody>
    </table>
  );
}
