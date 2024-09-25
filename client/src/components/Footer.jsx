import {
  YoutubeFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from '@ant-design/icons';

export default function Footer() {
  const icons = [
    <YoutubeFilled />,
    <TwitterCircleFilled />,
    <FacebookFilled />,
  ];

  const options = ['Contact use', 'Privacy Police', 'Help'];

  return (
    <footer className='flex flex-row justify-between bg-slate-800 text-slate-50 px-16 py-4 w-auto'>
      <div>@2022 All Right Reserved</div>
      <div className='flex gap-4'>
        {icons.map((icon) => (
          <div className='text-xl mr-2'>{icon}</div>
        ))}
      </div>
      <div className='flex gap-4'>
        {options.map((option) => (
          <span>{option}</span>
        ))}
      </div>
    </footer>
  );
}
