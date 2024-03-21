import React, { useState, useEffect } from 'react';
import { getProducts, getCategory } from '../../../services/fetchProducts';
import './Collection.css';
import { Link } from 'react-router-dom';
import CategoryNavbar from '../categories/CategoryNavbar';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error getting products', error);
      }
    };

    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error getting categories', error);
      }

    };

    fetchProductsData();
    fetchCategoriesData();
  }, []);

  return (
    <>
      <div className="collection-container">
        
                   <CategoryNavbar categories={categories} /> 

        <div className="products">
          <div className="columns-container">
            {products && Array.from({ length: Math.ceil(products.length / 4 ) }).map((_, columnIndex) => (
              <div className="column" key={columnIndex}>
                {products
                  .filter((_, index) => index % 4 === columnIndex)
                  .map((product) => (
                    <Link to={`/product/${product.ID}`} key={product.ID}>
                      <div className="product-container">
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
