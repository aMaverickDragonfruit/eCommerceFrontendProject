import { Typography } from 'antd';
const { Title } = Typography;
import ProductForm from '../components/Product/ProductForm';

export default function AddProduct() {
  return (
    <div className='flex flex-col'>
      <p className='text-4xl font-bold mb-10'>Create Product</p>
      <ProductForm />
    </div>
  );
}
