import { Typography } from 'antd';
const { Title } = Typography;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('useEffect called');
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state.productSlice);

  if (loading) return <div>loading</div>;

  return (
    <>
      <Title>Products</Title>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
}
