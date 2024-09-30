import { Button, Typography, Pagination } from 'antd';
const { Title } = Typography;
import { useSelector } from 'react-redux';
import ProductCard from '../components/Product/ProductCard';
import Selector from '../components/Selector';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Products() {
  const { products, loading } = useSelector((state) => state.productSlice);
  const [current, setCurrent] = useState(1);

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

  const handleChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <div className='pt-10 px-20'>
      <div className='flex flex-col lg:flex-row justify-between'>
        <p className='text-4xl font-bold'>Products</p>
        <div className='flex items-center space-x-10'>
          <Selector
            options={sortingOptions}
            handleChange={handleSorting}
          />
          <Button
            onClick={handleClick}
            type='primary'
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* products grid */}
      <div className='pt-10 gap-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      <Pagination
        className='py-10'
        align='end'
        current={current}
        onChange={handleChange}
        defaultCurrent={1}
        defaultPageSize={10}
        total={products.length}
      />
    </div>
  );
}
