import { Flex, Image, Typography, Button } from 'antd';
const { Title, Text } = Typography;

export default function DetailCard() {
  return (
    <Flex>
      <Image
        width={400}
        src='https://static.dezeen.com/uploads/2014/09/Apple-iWatch-ss-dezeen_784_02.jpg'
      />
      <Flex vertical>
        <Text>Category</Text>
        <Title>Title</Title>
        <Title level={3}>$199</Title>
        <Text className='w-80'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </Text>
        <Flex>
          <Button type='primary'>Add To Cart</Button>
          <Button>Edit</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
