import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import Notification from '../components/Notification';

export default function PwUpdatedNoti() {
  const navigate = useNavigate();

  const icon = <MailOutlined />;
  const message =
    'We have sent the update password link to your email, please check that !';

  const onClose = () => {
    navigate('/signin');
  };

  return <Notification icon={icon} message={message} onClose={onClose} />;
}
