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
      <div className='nav-container'>
        <Link className='nav-logo' to="/issaarchivos/">AIM</Link>
        <div className='nav-options'>
          <Link className='nav-link' to="/issaarchivos/shop">Shop</Link>
          <Link className='nav-link' to="/issaarchivos/collection">Collections</Link>
          <Link className='nav-link' to="/issaarchivos/collabs">Virtual Fiting</Link>
          <Link className='nav-link' to="/issaarchivos/about">About</Link>
        </div>
        <Link className='nav-link' to="/issaarchivos/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
