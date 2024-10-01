import { ConfigProvider, Layout } from 'antd';
const { Content } = Layout;
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import Home from '../pages/Home';

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

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
        <Content className='flex justify-center items-center'>
          {currentPath === '/' ? <Home /> : <Outlet />}
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}
