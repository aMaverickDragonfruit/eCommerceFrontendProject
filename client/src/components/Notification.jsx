import React from 'react';
import { Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function Notification({ icon, message, onClose }) {
  return (
    <div className='relative flex flex-col justify-center text-center box-content h-72 w-96 border-2 rounded-md px-10 py-12 pb-20 shadow-md'>
      <CloseOutlined
        className='absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800 cursor-pointer'
        onClick={onClose}
      />
      <div className='text-5xl mb-4'>{icon}</div>
      <p>{message}</p>
    </div>
  );
}
