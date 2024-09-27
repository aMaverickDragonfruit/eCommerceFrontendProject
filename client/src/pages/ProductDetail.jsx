import { Typography } from 'antd';
const { Title } = Typography;
import DetailCard from '../components/DetailCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../features/productSlice';

export default function ProductDetails() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const { curProduct, loading, error } = useSelector(
    (state) => state.productSlice
  );
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading) return <div>loading</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className='flex flex-col'>
      <Title>Product Detail</Title>
      <DetailCard product={curProduct} />
    </div>
  );
}
