import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { getCategory } from '../../services/fetchProducts';
import './Navbar.css';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategory();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidenav ${isExpanded ? 'expanded' : ''}`}>
      <div className="toggle-button" onClick={toggleNavbar}>
        {isExpanded ? 'X' : 'OPEN'}
      </div>
<div className='nav-options-container'>
      {isExpanded && (
        <div className='nav-options'>
          <Link className='nav-link' to="/" onClick={toggleNavbar}>HOME</Link>
          <Link className='nav-link' to="/collection" onClick={toggleNavbar}>PRODUCT</Link>
          <Link className='nav-link' to="/createProduct" onClick={toggleNavbar}>CREATE</Link>
        </div>
      )}

      {isExpanded && (
        <div className="category-container">
          {categories.map(category => (
            <Link key={category.ID} className='nav-link' to={`/category/${category.ID}`} onClick={toggleNavbar}>{category.Name}</Link>
          ))}
        </div>
      )}
 </div>
    </div>
  );
}

export default Navbar;
