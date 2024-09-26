import { Button, Form, Input, Flex, Select, Space, Skeleton } from 'antd';
const { TextArea } = Input;

export default function ProductForm({ onSubmit }) {
  return (
    <Form
      className='border-2 bg-slate-white p-10'
      layout='vertical'
      onFinish={onSubmit}
      autoComplete='off'
    >
      <Form.Item
        name='name'
        label='Product Name'
      >
        <Input placeholder='iWatch'></Input>
      </Form.Item>
      <Form.Item
        name='description'
        label='Product Description'
      >
        <TextArea rows={4}></TextArea>
      </Form.Item>
      <Flex>
        <Form.Item
          name='category'
          label='Category'
        >
          <Select
            defaultValue='Category1'
            // onChange={handleChange}
            options={[
              { value: 'Category1', label: 'Category1' },
              { value: 'Category2', label: 'Category2' },
              { value: 'Category3', label: 'Category3' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name='price'
          label='Price'
        >
          <Input placeholder='50'></Input>
        </Form.Item>
      </Flex>
      <Flex>
        <Form.Item
          name='quantity'
          label='In Stock Quantity'
        >
          <Input placeholder='100'></Input>
        </Form.Item>
        <Form.Item
          name='link'
          label='Add Image Link'
        >
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
  );
}
