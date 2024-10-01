import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function EditProductBtn({ productId }) {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${productId}`);
  };
  return (
    <Button onClick={handleEdit} className='max-w-fit'>
      Edit
    </Button>
  );
}
