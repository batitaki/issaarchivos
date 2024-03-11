import React, { useState, useEffect } from 'react';
import { getProductById } from '../../services/fetchProducts';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.Name}</h2>
          <p>Description: {product.Description}</p>
          <p>Price: {product.Price}</p>
          <p>Category: {product.Category ? product.Category.Name : 'N/A'}</p>
          <img src={product.Image} alt={product.Name} style={{ maxWidth: '200px' }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
