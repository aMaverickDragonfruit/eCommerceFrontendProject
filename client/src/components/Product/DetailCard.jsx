import { Flex, Image, Typography, Button } from 'antd';
import AddToCartButton from './AddToCartBtn';
const { Title, Text } = Typography;

export default function DetailCard({ product }) {
  const { _id, userId, name, description, category, price, stock, imgUrl } =
    product;
  return (
    <div className='flex flex-col lg:flex-row space-x-4 bg-white p-10'>
      <div className='w-full lg:w-1/2'>
        <Image
          className=''
          src={imgUrl}
        />
      </div>
      <div className='w-full lg:w-1/2 px-10 pt-10'>
        <p>{category}</p>
        <Title>{name}</Title>
        <Title level={3}>{price}</Title>
        <Text className='w-80'>{description}</Text>
        <div className='pt-4 flex space-x-4'>
          <AddToCartButton type='primary'>Add To Cart</AddToCartButton>
          <Button
            type='default'
            className='w-24'
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
