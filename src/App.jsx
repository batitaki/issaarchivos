import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home';
import Collection from './components/collection/Collection';
import CreateProduct from './components/collection/CreateProduct';
import ProductDetail from './components/collection/ProductDetail';
import Navbar from './components/layout/Navbar';
import './App.css';
import BackgroundSketch from './components/layout/BackgroundSketch';


function App() {


  return (
    <div>
      <Router>
<BackgroundSketch/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
