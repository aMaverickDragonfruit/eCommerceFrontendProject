import { ConfigProvider, Layout } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(79 70 229)', // Tailwind's bg-indigo-500 color
          borderRadius: '0.25rem',
        },
      }}
    >
      <Layout className='min-h-screen'>
        <Navbar />
        <Content className='flex-grow flex justify-center items-center'>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}
