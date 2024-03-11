import React, {useState, useEffect } from "react";
import { getProducts } from "../../services/fetchProducts";

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
      <div className="product-container">
        <ul className="product-list">
          {products.map((product) => (
            <li>
              <h3>{product.Name}</h3>
              <p>Description: {product.Description}</p>
              <p>Price: {product.Price}</p>
              <img className="product-image" src={product.Image}/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Collection;
