import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCurrentProduct } from '../features/productSlice';

import ProductForm from '../components/Product/ProductForm';

export default function AddProduct({ isEdit }) {
  const dispatch = useDispatch();

  let { id: productId } = useParams();

  useEffect(() => {
    if (isEdit && productId) {
      dispatch(fetchCurrentProduct(productId));
    }
  }, [dispatch, productId, isEdit]);

  const { curProduct, loading, error } = useSelector(
    (state) => state.productSlice
  );

  const title = isEdit ? 'Edit Product' : 'Create Product';
  return (
    <div className=''>
      <p className='text-4xl font-bold mb-10'>{title}</p>
      <ProductForm
        isEdit={isEdit}
        curProduct={curProduct}
      />
    </div>
  );
}
