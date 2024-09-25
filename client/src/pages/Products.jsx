import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const initProducts = [
    {
      imgLink: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      productName: 'Beautiful handbag',
      price: 25,
    },
  ];
  const [products, setProducts] = useState(initProducts);
  console.log(products);

  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  );
}
