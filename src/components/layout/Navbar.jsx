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
        {isExpanded ? 'Cerrar' : 'Expandir'}
      </div>
      <Link to="/" onClick={toggleNavbar}>Inicio</Link>
      <Link to="/collection" onClick={toggleNavbar}>Productos</Link>
      <Link to="/createProduct" onClick={toggleNavbar}>Crear</Link>
      <Link to="/producto/:id" onClick={toggleNavbar}>Acerca de</Link>
    </div>
  );
}

export default Navbar;
