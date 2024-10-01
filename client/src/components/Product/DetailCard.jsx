import { Flex, Image, Typography, Button } from 'antd';
import AddToCartButton from './AddToCartBtn';
import EditProductBtn from './EditProductBtn';
import { useSelector } from 'react-redux';
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
  } = product;
  const { _id: userId } = useSelector((state) => state.userSlice.user);

  return (
    <div className='flex flex-col lg:flex-row justify-center space-x-4 bg-white p-10'>
      <div className='w-full lg:w-1/2 flex justify-center items-center'>
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
