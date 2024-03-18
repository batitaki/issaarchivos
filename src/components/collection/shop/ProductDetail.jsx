import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategory, getProductById } from "../../../services/fetchProducts";
import { getMediaByProduct } from "../../../services/fetchMedia";
import { SlideshowLightbox } from "lightbox.js-react";
import { useTranslation } from "react-i18next";
import "./ProductDetail.css";
import PhotoUploader from "../../media/PhotoUploader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Product = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        setProductDetails(productData);

        if (productData && productData.CategoryID) {
          const categoryData = await getCategory(productData.CategoryID);
          setCategoryName(categoryData ? categoryData.Name : "");
        }

        const mediaData = await getMediaByProduct(id);
        setMedia(mediaData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    // Estilos personalizados en línea para el slider
    style: {
      width: "80%", // Ancho del slider
      margin: "0 auto", // Centrar el slider
    },
  };

  return (
    <>
      <div className="productContent">
        <div className="media-container">
          <div className="mediaGallery">
            <Slider {...sliderSettings}>
              {media.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.Image}
                    alt={`Image ${index}`}
                    style={{ width: "80%", outline: "none" }}
                  />{" "}
                  {/* Establece el ancho de la imagen al 100% */}
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {productDetails ? (
          <div className="product-content">
            <Link
              to={`/Category/${productDetails.CategoryID}`}
              className="Category-name"
            >
              {categoryName}
            </Link>
            <br />
            <div className="info">
              <h1 className="product-title">{productDetails.Name}</h1>
              <p className="price">
                {" "}
                {t("price")}: {productDetails.Price} USD
              </p>
              <p className="price"> {productDetails.Description}</p>
            </div>
            <div className="productImage">
              <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto">
                <img
                  className="product-detail-image"
                  src={productDetails.Image}
                  alt={productDetails.Name}
                />
              </SlideshowLightbox>
            </div>
          </div>
        ) : (
          <p className="loading">LOADING...</p>
        )}
      </div>
      <div className="photoUploaderContainer">
        <PhotoUploader productId={id} />
      </div>
    </>
  );
};

export default Product;
