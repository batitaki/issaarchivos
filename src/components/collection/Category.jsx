import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '../../services/fetchProducts';
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

  // Fetch categories for CategoryNavbar
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error getting categories', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>

      <div className='category'>
      <CategoryNavbar categories={categories} /> 
        <div className="columns-container">
          {products &&
            Array.from({ length: Math.ceil(products.length / 2) }).map((_, columnIndex) => (
              <div className="column" key={columnIndex}>
                {products
                  .filter((_, index) => index % 2 === columnIndex)
                  .map((product) => (
                    <div className="product-container" key={product.ID}>
                      <div className="product">
                        <img className="product-image" src={product.Image} alt={product.Title} />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Category;
