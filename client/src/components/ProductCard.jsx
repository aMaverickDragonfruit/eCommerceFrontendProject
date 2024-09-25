import React from 'react';
import { Card } from 'antd';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { img, productName, price } = product;
  cons[(counts, setCounts)] = useState(0);
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt='example'
          src={img}
        />
      }
    >
      <Meta
        title={productName}
        price={price}
      />
    </Card>
  );
}
