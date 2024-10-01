import { Typography } from 'antd';
const { Title } = Typography;
import DetailCard from '../components/Product/DetailCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentProduct } from '../features/productSlice';
import ServerError from '../pages/ServerError';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function ProductDetails() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const { curProduct, loading, error } = useSelector(
    (state) => state.productSlice
  );
  useEffect(() => {
    dispatch(fetchCurrentProduct(id));
  }, [dispatch, id]);

  if (error) return <ServerError message={error} />;

  return (
    <Spin indicator={<LoadingOutlined spin />} size='large' spinning={loading}>
      <div className='px-20 pt-10'>
        <p className='text-4xl font-bold mb-10'>Product Detail</p>
        <DetailCard product={curProduct} />
      </div>
    </Spin>
  );
}
