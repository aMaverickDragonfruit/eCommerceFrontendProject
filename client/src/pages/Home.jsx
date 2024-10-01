import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={<SmileOutlined />}
      title='Welcome to Our Website!'
      extra={
        <Button type='primary' onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      }
    />
  );
};

export default Home;
