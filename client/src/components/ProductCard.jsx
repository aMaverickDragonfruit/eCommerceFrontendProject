import React from 'react';
import { Card, Button, Flex } from 'antd';
const { Meta } = Card;
import AddToCartButton from './AddToCartBtn';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { _id, userId, name, description, category, price, stock, imgUrl } =
    product;
  //   const [counts, setCounts] = useState(0);
  //   console.log(imgLink, productName, price);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    console.log('edit');
  };

  return (
    <Card
      className='w-80 border-2'
      hoverable
      cover={
        <img
          className=''
          alt='example'
          src={imgUrl}
        />
      }
      onClick={() => {
        navigate(`/products/${_id}`);
      }}
    >
      <Meta
        title={name}
        description={price}
      />
      <Flex>
        <AddToCartButton type='primary'>Add</AddToCartButton>
        <Button
          onClick={handleClick}
          type='text'
        >
          Edit
        </Button>
      </Flex>
    </Card>
  );
}
