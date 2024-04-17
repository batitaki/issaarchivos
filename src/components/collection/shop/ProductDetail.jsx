import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategory, getProductById } from "../../../services/fetchProducts";
import { getMediaByProduct } from "../../../services/fetchMedia";
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
  const [selectedColor, setSelectedColor] = useState(null);

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
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    style: {
      width: "100%", // Ancho del slider
      margin: "0 auto", // Centrar el slider
    },
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const allColors = media.reduce((acc, mediaItem) => {
    mediaItem.Colors.forEach((color) => {
      if (!acc.includes(color.Name)) {
        acc.push(color.Name);
      }
    });
    return acc;
  }, []);

  const filteredMedia = selectedColor
    ? media.filter((mediaItem) =>
        mediaItem.Colors.every((color) => color.Name === selectedColor)
      )
    : media;

  const addToCart = () => {
    const cartItem = {
      productDetails,
      selectedColor,
      selectedSize: "", // Aquí necesitarías incluir el tamaño seleccionado si lo tienes
      quantity: 1,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));
    alert("Product added to cart!");
  };

  return (
    <>
      <div className="productContent">
        <div className="media-container">
          <div className="mediaGallery">
            <Slider {...sliderSettings}>
              {filteredMedia.slice(0, 6).map(
                (
                  mediaItem,
                  index
                ) => (
                  <div className="image-carrousell" key={index}>
                    <img
                      src={mediaItem.Image}
                      alt={`Media ${index}`}
                      style={{ width: "100%", outline: "none" }}
                    />
                  </div>
                )
              )}
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
              <button className="add-to-cart" onClick={addToCart}>
                Add to Cart
              </button>
              <div className="product-colors">
                <ul>
                  {allColors.map((color, colorIndex) => (
                    <li
                      key={colorIndex}
                      onClick={() => handleColorClick(color)}
                      style={{ display: "inline-block", marginRight: "5px" }} // Ajuste para mostrar los elementos en línea
                    >
                      <div
                        className="color-circle"
                        style={{ backgroundColor: color }}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="product-title">{productDetails.Name}</p>
              <p className="price">
                {t("price")}: {productDetails.Price} USD
              </p>
              <p className="product-description">
                {productDetails.Description}
              </p>

              <div className="sizes-container">
                <h4 className="price">sizes:</h4>
                <ul>
                  {productDetails &&
                    productDetails.Sizes &&
                    productDetails.Sizes.map((size, index) => (
                      <li key={index}>{size.Name}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="productImage">
       
                {filteredMedia.length > 0 && (
                  <img
                    className="product-detail-image"
                    src={filteredMedia[0].Image}
                    alt={productDetails.Name}
                  />
                )}
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
