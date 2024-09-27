import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner() {
  return (
    <div className='w-full h-full'>
      <Spin indicator={<LoadingOutlined spin />} size='large' />
    </div>
  );
}
