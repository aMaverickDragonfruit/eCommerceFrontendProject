import { Layout } from 'antd';
const { Footer } = Layout;
import {
  YoutubeFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from '@ant-design/icons';

export default function AppFooter() {
  const icons = [
    <YoutubeFilled />,
    <TwitterCircleFilled />,
    <FacebookFilled />,
  ];

  const options = ['Contact us', 'Privacy Police', 'Help'];

  return (
    <Footer className='flex flex-row justify-between bg-slate-800 text-slate-50 px-16 py-4 w-auto'>
      <p>@2022 All Right Reserved</p>
      <div className='flex gap-4'>
        {icons.map((icon, index) => (
          <div
            key={index}
            className='text-xl mr-2'
          >
            {icon}
          </div>
        ))}
      </div>
      <div className='flex gap-4'>
        {options.map((option, index) => (
          <span key={index}>{option}</span>
        ))}
      </div>
    </Footer>
  );
}
