import { Select } from 'antd';

// options need to be an array of object. object keys will be value, label, disable
export default function Selector({ options, defaultValue, handleChange }) {
  return (
    <Select
      defaultValue={defaultValue ? defaultValue : options[0]}
      options={options}
      onChange={handleChange}
      className='w-36'
    />
  );
}
