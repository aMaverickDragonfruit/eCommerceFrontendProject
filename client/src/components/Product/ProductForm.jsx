import { Button, Form, Input, Space, Skeleton, Image } from 'antd';
const { TextArea } = Input;
import { createProduct } from '../../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Selector from '../Selector';
// import Spinner from './Spinner';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { deleteCurProduct, updateProduct } from '../../features/productSlice';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({ isEdit, curProduct }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Create form instance
  const navigate = useNavigate();

  // console.log(curProduct);

  const categoryOptions = [
    { value: 'Watch', label: 'Watch' },
    { value: 'Phone', label: 'Phone' },
    { value: 'Labtop', label: 'Labtop' },
  ];

  const { _id: userId } = useSelector((state) => state.userSlice.user);
  const { loading, error } = useSelector((state) => state.productSlice);

  const handleCreateProduct = (data) => {
    data.userId = userId;
    dispatch(createProduct(data));
    navigate('/products');
    // console.log(data);
  };

  const handleUpdateProduct = (data) => {
    dispatch(updateProduct({ productId: curProduct._id, productInfo: data }));
    navigate('/products');
    // console.log('update' + curProduct._id, data);
  };

  useEffect(() => {
    return () => {
      dispatch(deleteCurProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    if (curProduct) {
      form.setFieldsValue({
        name: curProduct.name,
        description: curProduct.description,
        category: curProduct.category,
        price: curProduct.price,
        stock: curProduct.stock,
        imgUrl: curProduct.imgUrl,
      });
    }
  }, [curProduct, form]);

  const [productUrl, setProductUrl] = useState(null);
  const [displayImg, setDisplayImg] = useState(false);

  return (
    <Spin
      indicator={<LoadingOutlined spin />}
      size='large'
      spinning={loading}
    >
      <Form
        form={form}
        className='border-2 bg-slate-white p-10 mb-10'
        layout='vertical'
        onFinish={isEdit ? handleUpdateProduct : handleCreateProduct}
        autoComplete='off'
      >
        <Form.Item
          name='name'
          label='Product Name'
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input placeholder='product name' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Product Description'
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <TextArea
            placeholder='discribe your product'
            rows={4}
          ></TextArea>
        </Form.Item>
        <div className='flex flex-col md:flex-row justify-between space-0 md:space-x-4'>
          <Form.Item
            name='category'
            label='Category'
            className='w-full md:w-1/2'
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Selector
              options={categoryOptions}
              placeholder='--select--'
            />
          </Form.Item>

          <Form.Item
            name='price'
            label='Price'
            className='w-full md:w-1/2'
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <Input placeholder='50'></Input>
          </Form.Item>
        </div>
        <div className='flex flex-col md:flex-row justify-between space-0 md:space-x-4'>
          <Form.Item
            name='stock'
            label='In Stock Quantity'
            className='w-full md:w-1/3'
            rules={[
              { required: true, message: 'Please enter the stock quantity' },
            ]}
          >
            <Input placeholder='100'></Input>
          </Form.Item>

          <Form.Item
            label='Add Image Link'
            className='w-full md:w-2/3'
          >
            <Space.Compact className='w-full'>
              <Form.Item
                name='imgUrl'
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please enter product image URL',
                  },
                ]}
              >
                <Input
                  placeholder='http://'
                  onChange={(e) => setProductUrl(e.target.value)}
                />
              </Form.Item>
              <Button
                type='primary'
                onClick={() => setDisplayImg(true)}
              >
                View
              </Button>
            </Space.Compact>
          </Form.Item>
        </div>
        <div className='text-center'>
          {curProduct.imgUrl || displayImg ? (
            <Image
              style={{ width: 400 }}
              src={productUrl || curProduct.imgUrl}
            />
          ) : (
            <Skeleton.Image style={{ width: 400, height: 300 }} />
          )}
        </div>
        <Button
          type='primary'
          htmlType='submit'
          className='w-full mt-10'
          size='large'
        >
          {isEdit ? 'Submit Edit' : 'Add Product'}
        </Button>
      </Form>
    </Spin>
  );
}
