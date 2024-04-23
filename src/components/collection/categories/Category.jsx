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
                      <Link to={`/issaarchivos/product/${product.ID}`}>
                          <img className="product-image" src={product.Image} alt={product.Title} />
                        </Link>
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
