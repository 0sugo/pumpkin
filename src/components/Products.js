import React from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
  const products = useSelector((store) => store.allProducts);
  return (
    <div>
      <ul>
        {products.products.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default Products;
