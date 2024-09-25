import { MailOutlined } from '@ant-design/icons';
import Notification from '../components/Notification';

export default function PwUpdatedNoti() {
  const icon = <MailOutlined />;
  const message =
    'We have sent the update password link to your email, please check that !';

  const onClose = () => {
    console.log('close');
  };

  return (
    <Notification
      icon={icon}
      message={message}
      onClose={onClose}
    />
  );
}
