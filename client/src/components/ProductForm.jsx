import { Button, Form, Input, Flex, Select, Space, Skeleton } from 'antd';
const { TextArea } = Input;
import { createProduct } from '../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Selector from './Selector';
// import Spinner from './Spinner';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function ProductForm() {
  const categoryOptions = [
    { value: 'Category1', label: 'Category1' },
    { value: 'Category2', label: 'Category2' },
    { value: 'Category3', label: 'Category3' },
  ];

  const [category, setCategory] = useState('');
  const { user } = useSelector((state) => state.userSlice);
  const { loading, error } = useSelector((state) => state.productSlice);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    data.category = category;
    data.userId = user.user.id;
    dispatch(createProduct(data));
  };
  return (
    <Spin indicator={<LoadingOutlined spin />} size='large' spinning={loading}>
      <Form
        className='border-2 bg-slate-white p-10'
        layout='vertical'
        onFinish={onSubmit}
        autoComplete='off'
      >
        <Form.Item name='name' label='Product Name'>
          <Input placeholder='iWatch'></Input>
        </Form.Item>
        <Form.Item name='description' label='Product Description'>
          <TextArea rows={4}></TextArea>
        </Form.Item>
        <Flex>
          <Form.Item name='category' label='Category'>
            <Selector
              options={categoryOptions}
              defaultValue='-select-'
              handleChange={(value) => setCategory(value)}
            />
          </Form.Item>

          <Form.Item name='price' label='Price'>
            <Input placeholder='50'></Input>
          </Form.Item>
        </Flex>
        <Flex>
          <Form.Item name='stock' label='In Stock Quantity'>
            <Input placeholder='100'></Input>
          </Form.Item>
          <Form.Item name='imgUrl' label='Add Image Link'>
            <Space.Compact>
              <Input defaultValue='http://' />
              <Button type='primary'>View</Button>
            </Space.Compact>
          </Form.Item>
        </Flex>
        <Skeleton.Image />
        <Button
          type='primary'
          htmlType='submit'
          className='w-full'
          size='large'
          // loading={status === 'pending'}
        >
          Add Product
        </Button>
      </Form>
    </Spin>
  );
}
