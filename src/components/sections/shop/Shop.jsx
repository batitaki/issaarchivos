import React, { useState, useEffect } from 'react';
import { getProducts, getCategory } from '../../../services/fetchProducts';
import './Shop.css';
import { Link, useLocation } from 'react-router-dom';
import CategoryNavbar from '../categories/CategoryNavbar';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');

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

  const filteredProducts = searchTerm ? products.filter(product => product.Name.toLowerCase().includes(searchTerm.toLowerCase())) : products;

  const renderProductRows = () => {
    const rows = [];
    const productsCount = filteredProducts.length;
    const productsPerRow = 4;
  
    for (let i = 0; i < productsCount; i += productsPerRow) {
      const rowProducts = filteredProducts.slice(i, i + productsPerRow);
  
      rows.push(
        <div className="product-row" key={i}>
          {rowProducts.map((product) => (
            <Link className='link-product' to={`/issaarchivos/product/${product.ID}`} key={product.ID}>
              <div className="product-container">
                <div className="product">
                  <img className="product-image" src={product.Image} alt={product.Title} />
                  <div className="product-details">
                    <p className="product-name">{product.Name}</p>
                    <p className="product-price"> ${product.Price},00 </p>
                  </div>
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
