import React from 'react';
import { Card, Button, Flex } from 'antd';
import { useState } from 'react';
const { Meta } = Card;

export default function ProductCard({ product }) {
  const { _id, userId, name, description, category, price, stock, imgUrl } =
    product;
  //   const [counts, setCounts] = useState(0);
  //   console.log(imgLink, productName, price);
  return (
    <Card
      className='w-80 border-2'
      hoverable
      cover={<img className='' alt='example' src={imgUrl} />}
    >
      <Meta title={name} description={price} />
      <Flex>
        <Button type='primary'>Add</Button>
        <Button type='text'>Edit</Button>
      </Flex>
    </Card>
  );
}
