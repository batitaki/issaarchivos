import React, {useState, useEffect } from "react";
import { getProducts } from "../../services/fetchProducts";
import './Collection.css'

const Collection = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error getting products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="products-container">
        <ul className="product-list">
          {products.map((product) => (
            <li className="product-container">
              <div className="info-container">
              <h3 className="text">{product.Name}</h3>
              <p className="text">Description: {product.Description}</p>
              <p className="text">Price: {product.Price}</p>
              </div>
              <div className="image-container">
              <img className="product-image" src={product.Image}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Collection;
