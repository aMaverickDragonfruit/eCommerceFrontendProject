import React, { useEffect, useState } from 'react';
import { Card, Button, Flex } from 'antd';
const { Meta } = Card;
import AddToCartButton from './AddToCartBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { _id, userId, name, description, category, price, stock, imgUrl } =
    product;

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log('edit');
  };

  const handleAddProduct = (e) => {
    e.stopPropagation();
    console.log('add product');
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
        <AddToCartButton
          type='primary'
          productId={_id}
          onClick={handleAddProduct}
        >
          Add more
        </AddToCartButton>

        <Button
          onClick={handleEdit}
          type='text'
        >
          Edit
        </Button>
      </Flex>
    </Card>
  );
}
