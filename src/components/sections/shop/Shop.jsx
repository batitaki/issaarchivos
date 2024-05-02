import React, { useState, useEffect } from 'react';
import { getProducts, getCategory } from '../../../services/fetchProducts';
import { getMediaByProduct } from '../../../services/fetchMedia';
import './Shop.css';
import { Link, useLocation } from 'react-router-dom';
import CategoryNavbar from '../categories/CategoryNavbar';
import { searchProducts } from '../../../services/fetchProducts';

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProductIndex, setHoveredProductIndex] = useState(null);
  const [hoveredProductImage, setHoveredProductImage] = useState(null);

  const fetchFilteredProducts = async () => {
    if (searchTerm) {
      try {
        const filteredProducts = await searchProducts(searchTerm);
        const productsWithImages = await Promise.all(
          filteredProducts.map(async (product) => {
            try {
              const media = await getMediaByProduct(product.ID);
              const productImage = media.length > 0 ? media[0].Image : null;
              return {
                ...product,
                media: media,
                image: productImage,
              };
            } catch (error) {
              console.error('Error fetching media for product:', error);
              return null;
            }
          })
        );
        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error filtering products:', error);
      }
    } else {
      const productsData = await getProducts();
      const productsWithImages = await Promise.all(
        productsData.map(async (product) => {
          try {
            const media = await getMediaByProduct(product.ID);
            const productImage = media.length > 0 ? media[0].Image : null;
            return {
              ...product,
              media: media,
              image: productImage,
            };
          } catch (error) {
            console.error('Error fetching media for product:', error);
            return null;
          }
        })
      );
      setProducts(productsWithImages);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);
        await fetchFilteredProducts();
      } catch (error) {
        console.error('Error getting data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const getSecondImage = (product) => {
    const media = product.media || [];
    return media.length > 1 ? media[1].Image : null;
  };

  const handleProductHover = (index, product) => {
    setHoveredProductIndex(index);
    setHoveredProductImage(getSecondImage(product));
  };

  return (
    <div className="collection-container">
      <CategoryNavbar categories={categories} />

      {loading ? (
        <div className="loading">LOADING...</div>
      ) : (
        <div className="products">
          <div className="product-rows-container">
            {products.map((product, index) => (
              <div className="product-row" key={index}>
                <Link className='link-product' to={`/issaarchivos/product/${product.ID}`}>
                  <div
                    className="product-container"
                    onMouseEnter={() => handleProductHover(index, product)}
                    onMouseLeave={() => setHoveredProductIndex(null)}
                  >
                    <div className="product">
                      <img
                        className="product-image"
                        src={hoveredProductIndex === index ? hoveredProductImage : product.image}
                        alt={product.Title}
                      />
                      <div className="product-details">
                        <p className="product-name">{product.Name}</p>
                        <p className="product-price"> ${product.Price},00 </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
