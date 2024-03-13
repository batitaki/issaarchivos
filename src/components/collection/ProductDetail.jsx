import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategory, getProductById } from '../../services/fetchProducts';
import { SlideshowLightbox } from 'lightbox.js-react';
import { useTranslation } from "react-i18next";
import './ProductDetail.css';
const Product = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductById(id);
        setProductDetails(productData);
        if (productData && productData.CategoryID) {
          const categoryData = await getCategory(productData.CategoryID);
          setCategoryName(categoryData ? categoryData.Name : '');
        }
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  console.log(productDetails); // Check productDetails in the console

  return (
    <div>
      {productDetails ? (
        <div className="productContent">
          <div className='product-content'>
            <Link to={`/Category/${productDetails.CategoryID}`} className='Category-name'>{categoryName}</Link>
            <div className='productImage'>
              <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto">
                <img
                  style={{ width: 'auto', height: '600px' }}
                  className="w-full"
                  src={productDetails.Image}
                  alt={productDetails.Name}
                />
              </SlideshowLightbox>
            </div>
            <br />
          </div>
          <div className='info'>
            <h1 className="product-title">{productDetails.Name}</h1>
            <p className='price'> {t("price")}: {productDetails.Price} USD</p>
            <p className='price'> {productDetails.Description}</p>
            <p className='price'> Category ID: {productDetails.categoryName}</p>
          </div>
        </div>
      ) : (
        <p className='loading'>LOADING...</p>
      )}
    </div>
  );
};

export default Product;
