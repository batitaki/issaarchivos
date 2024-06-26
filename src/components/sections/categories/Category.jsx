import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '../../../services/fetchProducts';
import './Category.css';
import CategoryNavbar from './CategoryNavbar';

const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      const categoryDetails = await getCategoryById(categoryId);
      setCategory(categoryDetails);

      const products = await getProductsByCategory(categoryId);
      setProducts(products);
    }
    fetchCategoryAndProducts();
  }, [categoryId]);

  const renderProductRows = () => {
    const rows = [];
    const productsCount = products.length;

    for (let i = 0; i < productsCount; i += 2) {
      const rowProducts = products.slice(i, i + 2);

      rows.push(
        <div className="product-row" key={i}>
          {rowProducts.map((product) => (
            <Link className='link-product' to={`/issaarchivos/product/${product.ID}`} key={product.ID}>
              <div className="product-container">
                <div className="product">
                  <img className="product-image" src={product.Image} alt={product.Title} />
                  <div className="product-details">
                    <p className="product-name">{product.Name}</p>
                    <p className="product-price">{product.Price},00 USD$</p>
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
    
    <div  className="collection-container">
      <CategoryNavbar categories={categories} /> 
      <div className="products">
        <div className="product-rows-container">
          {renderProductRows()}
        </div>
      </div>
    </div>
  );
};

export default Category;
