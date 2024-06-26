import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../services/fetchProducts';
import { Link, useLocation } from 'react-router-dom';
import './Category.css';

const CategoryNavbar = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error getting categories', error);
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <nav className="category-info-container">
      <ul className='category-list'>
        {categories.map(category => (
          <li key={category.ID} className={location.pathname === `/issaarchivos/category/${category.ID}` ? 'selected' : ''}>
            <Link className='category-link' to={`/issaarchivos/category/${category.ID}`}>
              {category.Name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;