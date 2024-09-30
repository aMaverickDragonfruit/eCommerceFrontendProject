import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
const App = () => (
  <Result
    icon={<SmileOutlined />}
    title='Your order has been placed!'
    extra={<Button type='primary'>Go back home</Button>}
  />
);
export default App;
