import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export default function AuthForm({
  buttonText,
  onSubmit,
  title,
  fields,
  errors,
  onClose,
}) {
  //   const { status } = useSelector((state) => state.user);

  return (
    <div className='relative'>
      <CloseOutlined
        className='absolute -top-4 right-0 text-xl text-gray-500 hover:text-gray-800 cursor-pointer'
        onClick={onClose}
      />
      <Typography className='text-2xl font-bold text-center mb-4'>
        {title}
      </Typography>
      <Form
        onFinish={onSubmit}
        autoComplete='off'
        layout='vertical'
      >
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.name}
            name={field.name}
            rules={field.rules}
          >
            {field.type === 'password' ? (
              <Input.Password
                placeholder={field.placeholder}
                // prefix={<LockOutlined />}
                size='large'
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                // prefix={field.prefix}
                size='large'
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='w-full'
            size='large'
            // loading={status === 'pending'}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
