import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <Result
      status='success'
      title='Your order has been placed!'
      extra={
        <Button type='primary' onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      }
    />
  );
};
export default Checkout;
