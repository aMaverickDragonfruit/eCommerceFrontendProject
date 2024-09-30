import { Typography } from 'antd';
const { Title } = Typography;
import DetailCard from '../components/Product/DetailCard';
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
    <div className='h-svh px-20 pt-10'>
      <p className='text-4xl font-bold mb-10'>Product Detail</p>
      <DetailCard product={curProduct} />
    </div>
  );
}
