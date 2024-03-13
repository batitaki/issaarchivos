import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/fetchProducts';
import './Collection.css';
import { Link } from 'react-router-dom';

const Collection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error getting products', error);
      }
    };
    fetchProductsData();
  }, []);

  return (
    <>
      <div className="collection-container">
        <h1 className="title">COLLECTION</h1>
        <div className="products">
          <div className="columns-container">
            {products && Array.from({ length: Math.ceil(products.length / 3) }).map((_, columnIndex) => (
              <div className="column" key={columnIndex}>
                {products
                  .filter((_, index) => index % 3 === columnIndex)
                  .map((product) => (
                    <Link to={`/product/${product.ID}`} key={product.ID}>
                    <div className="product-container" key={product.id}>
                      <div className="product">
                        <img className="product-image" src={product.Image} alt={product.Title} />
                      </div>
                    </div>
                  </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
