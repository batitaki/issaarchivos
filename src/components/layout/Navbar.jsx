import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidenav ${isExpanded ? 'expanded' : ''}`}>
      <div className="toggle-button" onClick={toggleNavbar}>
        {isExpanded ? 'X' : 'OPEN'}
      </div>

      {/* Condiciona el renderizado de las opciones de navegación */}
      {isExpanded && (
        <div className='nav-options'>
          <Link className='nav-link' to="/" onClick={toggleNavbar}>HOME</Link>
          <Link className='nav-link' to="/collection" onClick={toggleNavbar}>PRODUCT</Link>
          <Link className='nav-link' to="/createProduct" onClick={toggleNavbar}>CREATE</Link>
          <Link className='nav-link' to="/product/:id" onClick={toggleNavbar}>ABOUT</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
