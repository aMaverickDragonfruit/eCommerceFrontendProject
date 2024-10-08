import { Layout } from 'antd';
const { Content } = Layout;
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function PwUpdate() {
  const navigate = useNavigate();

  const fields = [
    {
      placeholder: 'Email',
      name: 'Email',
      type: 'text',
    },
  ];

  const onSubmit = () => {
    navigate('/email-sent');
  };

  const onClosed = () => {
    navigate('/signin');
  };

  return (
    <div className='box-border md:box-content  h-fit mt-8 md:mt-20 w-11/12 md:w-96 border-2 rounded-md px-10 py-12 shadow-md'>
      <AuthForm
        buttonText='Update password'
        onSubmit={onSubmit}
        onClose={onClosed}
        title='Update your password'
        fields={fields}
      />

      <p>Enter your email, we will send you the recovery link</p>
    </div>
  );
}
