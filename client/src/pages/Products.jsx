import { Button, Typography, Pagination, Flex } from 'antd';
const { Title } = Typography;
import { useSelector } from 'react-redux';
import ProductCard from '../components/Product/ProductCard';
import Selector from '../components/Selector';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ServerError from '../pages/ServerError';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Products() {
  const { products, loading, error } = useSelector(
    (state) => state.productSlice
  );

  const numPerPage = 8;
  const [init, setInit] = useState(0);
  const [last, setLast] = useState(numPerPage);
  const [sorting, setSorting] = useState('');

  const { _id: userId, isVender } = useSelector(
    (state) => state.userSlice.user
  );

  const navigate = useNavigate();

  if (error) return <ServerError message={error} />;

  const sortingOptions = [
    { value: 'lastAdded', label: 'Last added' },
    { value: 'lowToHigh', label: 'Price: low to high' },
    { value: 'highToLow', label: 'Price: high to low' },
  ];

  const handleSorting = (value) => {
    // console.log(value);
    setSorting(value);
  };
  const handleClick = () => {
    navigate('/add-product');
  };

  const handlePagination = (value) => {
    setInit((value - 1) * numPerPage);
    setLast(value * numPerPage);
  };

  const sortedProducts = [...products];

  if (sorting === 'lowToHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sorting === 'highToLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sorting === 'lastAdded') {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <Spin indicator={<LoadingOutlined spin />} size='large' spinning={loading}>
      <div className='pt-10 px-20'>
        <div className='flex flex-col lg:flex-row justify-between'>
          <p className='text-4xl font-bold'>Products</p>
          <div className='flex items-center space-x-10'>
            <Selector
              options={sortingOptions}
              onChange={handleSorting}
              placeholder='Sort'
            />
            {isVender && (
              <Button onClick={handleClick} type='primary'>
                Add Product
              </Button>
            )}
          </div>
        </div>

        {/* products grid */}
        <div className='pt-10 gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
          {sortedProducts.slice(init, last).map((product) => (
            <ProductCard
              className={''}
              key={product._id}
              product={product}
              userId={userId}
            />
          ))}
        </div>

        <Pagination
          className='py-10'
          align='end'
          current={init + 1}
          onChange={handlePagination}
          defaultCurrent={1}
          defaultPageSize={numPerPage}
          total={products.length}
        />
      </div>
    </Spin>
  );
}
