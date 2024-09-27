import { Button, Typography } from 'antd';
const { Title } = Typography;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import ProductCard from '../components/ProductCard';
import Selector from '../components/Selector';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state.productSlice);
  const navigate = useNavigate();

  if (loading) return <div>loading</div>;

  const sortingOptions = [
    { value: 'lastAdded', label: 'Last added' },
    { value: 'lowToHigh', label: 'Price: low to high' },
    { value: 'highToLow', label: 'Price: high to low' },
  ];

  const handleSorting = () => {
    console.log('handle sorting');
  };
  const handleClick = () => {
    navigate('/add-product');
  };

  return (
    <>
      <div className='flex '>
        <Title>Products</Title>
        <div>
          <Selector options={sortingOptions} handleChange={handleSorting} />
          <Button onClick={handleClick} type='primary'>
            Add Product
          </Button>
        </div>
      </div>
      {/* products grid */}
      <div className='border-2 gap-10 grid grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
