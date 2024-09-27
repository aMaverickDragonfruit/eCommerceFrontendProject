import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { useState } from 'react';
// import { authUser } from 'app/userSlice';
import { createUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
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
      name: 'password',
      type: 'password',
      rules: [
        {
          required: true,
          message: 'Invalid Password Input!',
        },
      ],
    },
  ];

  const [vender, setVender] = useState(false);
  const onSubmit = (data) => {
    data.isVender = vender;
    console.log(data);
    dispatch(createUser(data)).then(() => {
      navigate('/signin');
    });
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
      <Checkbox onChange={(e) => setVender(e.target.checked)}>
        I am a vender
      </Checkbox>
      <p>
        Already have an account <Link to='/signin'>Sign in</Link>
      </p>
    </div>
  );
}
