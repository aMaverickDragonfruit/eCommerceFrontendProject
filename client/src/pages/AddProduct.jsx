import { Typography } from 'antd';
const { Title } = Typography;
import ProductForm from '../components/ProductForm';

export default function AddProduct() {
  return (
    <div className='flex flex-col'>
      <Title>Create Product</Title>
      <ProductForm />
    </div>
  );
}
