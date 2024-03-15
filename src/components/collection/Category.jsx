import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '../../services/fetchProducts';

const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      const categoryDetails = await getCategoryById(categoryId);
      setCategory(categoryDetails);

      const products = await getProductsByCategory(categoryId);
      setProducts(products);
    }
    fetchCategoryAndProducts();
  }, [categoryId]);

  return (
    <div>
      <h2>Category Details</h2>
      {category && (
        <div>
          <p>Name: {category.Name}</p>
          <p>Descripticon: {category.Description}</p>
          {/* Mostrar más detalles de la categoría según sea necesario */}
        </div>
      )}

      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <>
          <li key={product.ID}>{product.Name}</li> 
          <img src={product.Image}></img>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Category;
