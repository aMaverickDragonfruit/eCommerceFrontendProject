import { Tag, Image, Typography, Button } from 'antd';
import AddToCartButton from './AddToCartBtn';
import EditProductBtn from './EditProductBtn';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const { Title, Text } = Typography;

export default function DetailCard({ product }) {
  const {
    _id,
    userId: ownerId,
    name,
    description,
    category,
    price,
    imgUrl,
    stock,
  } = product;
  const { _id: userId } = useSelector((state) => state.userSlice.user);
  // console.log(stock);
  const [rows, setRows] = useState(4);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className='flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-4 bg-white p-10'>
      <div className='w-full lg:w-1/2 flex justify-center items-center'>
        <Image
          className=''
          src={imgUrl}
        />
      </div>
      <div className='w-full lg:w-1/2 px-10 pt-10'>
        <p className='text-zinc-600 pb-2'>{category}</p>
        <p className='text-zinc-600 font-semibold text-base lg:text-4xl'>
          {name}
        </p>
        <div className='flex flex-col lg:flex-row items-start lg:items-center -space-y-2 lg:space-x-4 mb-2'>
          <p className='text-indigo-700 font-extrabold text-lg lg:text-2xl py-4'>
            ${price}
          </p>
          {/* out of stock tag */}
          {stock === 0 && (
            <Tag
              className='h-fit lg:text-lg'
              color='red'
            >
              Out of Stock
            </Tag>
          )}
        </div>
        <Typography.Paragraph
          ellipsis={{
            rows,
            expandable: 'collapsible',
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
          }}
        >
          {description}
        </Typography.Paragraph>
        <div className='pt-4 flex space-x-4'>
          <AddToCartButton
            type='primary'
            productId={_id}
          >
            Add To Cart
          </AddToCartButton>
          {userId === ownerId && <EditProductBtn productId={_id} />}
        </div>
      </div>
    </div>
  );
}
