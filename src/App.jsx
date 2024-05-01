import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home';
import Shop from './components/sections/shop/Shop';
import CreateProduct from './components/admin/CreateProduct';
import ProductDetail from './components/sections/shop/ProductDetail';
import Navbar from './components/layout/Navbar';
import Category from './components/sections/categories/Category'; 
import './App.css';
import Fan from './components/sections/sketch/Fan';
import Cart from './components/sections/cart/Cart';
import Login from './components/user/Login';
import { AuthProvider } from './components/user/Login';
import CollectionSketch from './components/sections/sketch/CollectionSketch';
import Collection from './components/sections/collections/Collection';
import About from './components/layout/About';

function App() {
  return (
    <div>
      <AuthProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/issaarchivos/" element={<Home />} />
            <Route path="/issaarchivos/fan" element={<Fan />} />
            <Route path="/issaarchivos/shop" element={<Shop />} />
            <Route path="/issaarchivos/createProduct" element={<CreateProduct />} />
            <Route path="/issaarchivos/product/:id" element={<ProductDetail />} />
            <Route path="/issaarchivos/category/:categoryId" element={<Category />} /> 
            <Route path="/issaarchivos/cart" element={<Cart />} />
            <Route path="/issaarchivos/login" element={<Login />} />
            <Route path="/issaarchivos/collabs" element={ <CollectionSketch />} />
            <Route path="/issaarchivos/collection" element={ <Collection />} />
            <Route path="/issaarchivos/about" element={ <About />} />

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
