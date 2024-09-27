import { Flex, Image, Typography, Button } from 'antd';
import AddToCartButton from './AddToCartBtn';
const { Title, Text } = Typography;

export default function DetailCard({ product }) {
  const { _id, userId, name, description, category, price, stock, imgUrl } =
    product;
  return (
    <Flex>
      <Image
        width={400}
        src={imgUrl}
      />
      <Flex vertical>
        <Text>{category}</Text>
        <Title>{name}</Title>
        <Title level={3}>{price}</Title>
        <Text className='w-80'>{description}</Text>
        <Flex>
          <AddToCartButton type='primary'>Add To Cart</AddToCartButton>
          <Button>Edit</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
