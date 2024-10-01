import React, { useEffect, useState } from 'react';
import { Card, Button, Typography } from 'antd';
const { Meta } = Card;
const { Text } = Typography;
import AddToCartButton from './AddToCartBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditProductBtn from './EditProductBtn';

export default function ProductCard({ product, userId, className }) {
  const navigate = useNavigate();
  const { _id, userId: ownerId, name, price, imgUrl } = product;

  const handleAddProduct = (e) => {
    e.stopPropagation();
    console.log('add product');
  };

  return (
    <Card
      className={`w-auto ${className}`}
      hoverable
      cover={
        <img
          className='m-0 p-4 pb-0 object-contain'
          alt='example'
          src={imgUrl}
        />
      }
      onClick={() => {
        navigate(`/products/${_id}`);
      }}
    >
      <Meta title={name}></Meta>
      <p className='py-4 text-2xl font-light text-indigo-600'>${price}</p>
      <div className='flex justify-between'>
        <AddToCartButton
          type='primary'
          productId={_id}
          onClick={handleAddProduct}
        >
          Add more
        </AddToCartButton>
        {userId === ownerId && <EditProductBtn productId={_id} />}
      </div>
    </Card>
  );
}
