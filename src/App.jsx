import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home';
import Collection from './components/collection/shop/Collection';
import CreateProduct from './components/form/CreateProduct';
import ProductDetail from './components/collection/shop/ProductDetail';
import Navbar from './components/layout/Navbar';
import Category from './components/collection/categories/Category'; // Importa el componente Category
import './App.css';
import BackgroundSketch from './components/layout/BackgroundSketch';
import Fan from './components/collection/sketch/Fan';

function App() {
  return (
    <div>
      <Router>
    
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fan" element={<Fan />} />
          <Route path="/shop" element={<Collection />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<Category />} /> {/* Agrega la nueva ruta para Category */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
