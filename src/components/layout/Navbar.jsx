import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { getCategory } from '../../services/fetchProducts'; // Importar getCategory
import './Navbar.css';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategory();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <div className="sidenav">
      <div className='nav-options-container'>
        <div className='nav-options'>
          <Link className='nav-link' to="/">Home</Link>
          <Link className='nav-link' to="/shop">Shop</Link>
          <Link className='nav-link' to="/createProduct">About</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
