import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
// import { authUser } from 'app/userSlice';

export default function LogIn() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const location = useLocation();

  const fields = [
    {
      placeholder: 'Email',
      name: 'Email',
      type: 'text',
      rules: [
        {
          required: true,
          message: 'Invalid Email Input!',
        },
      ],
    },
    {
      placeholder: 'Password',
      name: 'Password',
      type: 'password',
      rules: [
        {
          required: true,
          message: 'Invalid Password Input!',
        },
      ],
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
    // dispatch(authUser(data)).then(() => {
    //   navigate(location.state?.from || '/');
    // });
  };

  const onClosed = () => {
    console.log('closed');
  };

  return (
    <div className='box-content w-96 border-2 rounded-md px-10 py-12 shadow-md'>
      <AuthForm
        buttonText='Create account'
        onSubmit={onSubmit}
        onClose={onClosed}
        title='Sign up an account'
        fields={fields}
      />

      <p>
        Already have an account <a href=''>Sign in</a>
      </p>
    </div>
  );
}
