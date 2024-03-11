// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home';
import Collection from './components/collection/Collection';
import CreateProduct from './components/collection/CreateProduct'
import ProductDetail from './components/collection/ProductDetail'
import Navbar from './components/layout/Navbar';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection/>}/>
        <Route path="/createProduct" element= {<CreateProduct/>}/>
        <Route path="/product/:id'" element= {<ProductDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
