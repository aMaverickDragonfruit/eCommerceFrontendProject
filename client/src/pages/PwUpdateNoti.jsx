import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { Content } from 'antd/es/layout/layout';

export default function PwUpdatedNoti() {
  const navigate = useNavigate();

  const icon = <MailOutlined />;
  const message =
    'We have sent the update password link to your email, please check that !';

  const onClose = () => {
    navigate('/signin');
  };

  return (
    <div className='flex justify-center h-fit mt-8 md:mt-20'>
      <Notification
        icon={icon}
        message={message}
        onClose={onClose}
      />
    </div>
  );
}
