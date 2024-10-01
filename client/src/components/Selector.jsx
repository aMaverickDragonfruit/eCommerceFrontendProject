import { Select } from 'antd';

// options need to be an array of objects with keys: value, label, disable
export default function Selector({ options, placeholder, value, onChange }) {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      className='w-40'
      value={value}
      onChange={onChange}
    />
  );
}
