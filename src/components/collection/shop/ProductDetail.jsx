import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategory, getProductById } from "../../../services/fetchProducts";
import { getMediaByProduct } from "../../../services/fetchMedia";
import { useTranslation } from "react-i18next";
import "./ProductDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhotoUploader from "../../media/PhotoUploader";

const Product = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [media, setMedia] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

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
        setLoading(false);
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
      width: "100%",
      margin: "0 auto",
    },
  };

  const handleColorClick = (color, media) => {
    setSelectedColor(color);
    setSelectedMedia(media);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const allColors = media.reduce((acc, mediaItem) => {
    mediaItem.Colors.forEach((color) => {
      if (!acc.some((item) => item.name === color.Name)) {
        acc.push({ name: color.Name, media: mediaItem.Image });
      }
    });
    return acc;
  }, []);

  const filteredMedia = selectedColor
    ? media.filter((mediaItem) =>
        mediaItem.Colors.some((color) => color.Name === selectedColor)
      )
    : media;

  const addToCart = () => {
    const cartItem = {
      productDetails,
      selectedColor,
      selectedSize,
      selectedMedia,
      quantity: 1,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));
    alert("Product added to cart!");
  };

  if (loading) {
    return <p className="loading">LOADING...</p>;
  }

  return (
    <>
      <div className="productContent">
        <div className="media-container">
          <div className="mediaGallery">
            <Slider {...sliderSettings}>
              {filteredMedia.slice(0, 6).map((mediaItem, index) => (
                <div className="image-carrousell" key={index}>
                  <img
                    src={mediaItem.Image}
                    alt={`Media ${index}`}
                    style={{ width: "100%", outline: "none" }}
                  />
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
              <button className="add-to-cart" onClick={addToCart}>
                Add to Bag
              </button>
              <div className="product-colors">
                <ul>
                  {allColors.map((color, colorIndex) => (
                    <li
                      key={colorIndex}
                      onClick={() => handleColorClick(color.name, color.media)}
                      style={{
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    >
                      <div
                        className={`color-circle ${
                          selectedColor === color.name ? "selected" : ""
                        }`}
                        style={{ backgroundColor: color.name }}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sizes-container">
                <h4 className="price">Sizes:</h4>
                <div className="size-options">
                  {productDetails &&
                    productDetails.Sizes &&
                    productDetails.Sizes.map((size, index) => (
                      <div
                        key={index}
                        className={`size-option${
                          selectedSize === size.Name ? " selected" : ""
                        }`}
                        onClick={() => handleSizeSelect(size.Name)}
                      >
                        {size.Name}
                      </div>
                    ))}
                </div>
              </div>
              <p className="product-title">{productDetails.Name}</p>
              <p className="price">
                {t("price")}: {productDetails.Price} USD
              </p>
              <p className="product-description">
                {productDetails.Description}
              </p>
            </div>
          </div>
        ) : (
          <p className="loading">LOADING...</p>
        )}
      </div>
      <PhotoUploader productId={id} />
    </>
  );
};

export default Product;
