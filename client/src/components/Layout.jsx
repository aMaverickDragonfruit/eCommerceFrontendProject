import { Layout } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <Layout className='min-h-screen'>
      <Navbar />
      <Content className='flex-grow flex justify-center items-center'>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}
