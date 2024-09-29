import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../features/userSlice';

const Option = ({ icon, children, handleClick }) => {
  return (
    <div
      className='cursor-pointer flex items-center flex-nowrap'
      onClick={handleClick}
    >
      <div className='mr-2'>{icon}</div>
      <span className='whitespace-nowrap'>{children}</span>
    </div>
  );
};

export default function NavOptions({ handleCart, className }) {
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={`h-12 flex gap-8 ${className}`}>
      {isAuthenticated ? (
        <>
          <Option
            icon={<UserOutlined className='text-xl' />}
            handleClick={() => dispatch(signOutUser())}
          >
            <div className='max-md:hidden'>Sign out</div>
          </Option>
          <Option
            icon={
              <ShoppingCartOutlined
                className='text-2xl'
                handleClick={handleCart}
              />
            }
          >
            {cart.subtotal}
          </Option>
        </>
      ) : (
        <>
          <Option
            icon={<UserOutlined className='text-xl' />}
            handleClick={() => navigate('/signin')}
          >
            <div className='max-md:hidden'>Sign in</div>
          </Option>
          <Option
            icon={
              <ShoppingCartOutlined
                className='text-2xl'
                handleClick={() => navigate('/signin')}
              />
            }
          >
            {(0).toFixed(2)}
          </Option>
        </>
      )}
    </div>
  );
}
