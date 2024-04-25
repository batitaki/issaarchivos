import React, { useState, useEffect } from 'react';
import { getProducts, getCategory } from '../../../services/fetchProducts';
import './Shop.css';
import { Link } from 'react-router-dom';
import CategoryNavbar from '../categories/CategoryNavbar';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        
        const categoriesData = await getCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error getting data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderProductRows = () => {
    const rows = [];
    const productsCount = products.length;

    for (let i = 0; i < productsCount; i += 5) {
      const rowProducts = products.slice(i, i + 5);

      rows.push(
        <div className="product-row" key={i}>
          {rowProducts.map((product) => (
            <Link to={`/issaarchivos/product/${product.ID}`} key={product.ID}>
              <div className="product-container">
                <div className="product">
                  <img className="product-image" src={product.Image} alt={product.Title} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="collection-container">
      <CategoryNavbar categories={categories} />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="products">
          <div className="product-rows-container">
            {renderProductRows()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
