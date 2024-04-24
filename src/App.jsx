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
import Cart from './components/collection/cart/Cart';
import Login from './components/user/Login';
import { AuthProvider } from './components/user/Login';
function App() {
  return (
    <div>
      <AuthProvider> {/* Envuelve la aplicación con AuthProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/issaarchivos/" element={<Home />} />
            <Route path="/issaarchivos/fan" element={<Fan />} />
            <Route path="/issaarchivos/shop" element={<Collection />} />
            <Route path="/issaarchivos/createProduct" element={<CreateProduct />} />
            <Route path="/issaarchivos/product/:id" element={<ProductDetail />} />
            <Route path="/issaarchivos/category/:categoryId" element={<Category />} /> 
            <Route path="/issaarchivos/cart" element={<Cart />} />
            <Route path="/issaarchivos/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
