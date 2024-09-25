import React from 'react';
import { Card, Button, Flex } from 'antd';
import { useState } from 'react';
const { Meta } = Card;

export default function ProductCard({ product }) {
  const { imgLink, productName, price } = product;
  //   const [counts, setCounts] = useState(0);
  //   console.log(imgLink, productName, price);
  return (
    <Card
      className='w-80 border-2'
      hoverable
      cover={
        <img
          className=''
          alt='example'
          src={imgLink}
        />
      }
    >
      <Meta
        title={productName}
        description={price}
      />
      <Flex>
        <Button type='primary'>Add</Button>
        <Button type='text'>Edit</Button>
      </Flex>
    </Card>
  );
}
