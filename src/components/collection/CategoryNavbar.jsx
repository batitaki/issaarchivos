import React, { useState, useEffect } from 'react';
import { getCategory } from '../../services/fetchProducts';
import { Link } from 'react-router-dom';
import './Category.css'; // Asegúrate de importar tus estilos si los tienes

const CategoryNavbar = () => {
  const [categories, setCategories] = useState([]);

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
          <li key={category.ID}>
            <Link className='category-link' to={`/category/${category.ID}`}>
              {category.Name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;
