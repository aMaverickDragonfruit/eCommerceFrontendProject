import { Typography } from 'antd';
const { Title } = Typography;
import DetailCard from '../components/DetailCard';

export default function AddProduct() {
  return (
    <div className='flex'>
      <Title>Create Detail</Title>
      <DetailCard />
    </div>
  );
}
