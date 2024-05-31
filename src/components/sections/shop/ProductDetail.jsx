import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategory, getProductById } from "../../../services/fetchProducts";
import { getMediaByProduct } from "../../../services/fetchMedia";
import "./ProductDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhotoUploader from "../media/PhotoUploader";
import { useAuth } from "../../user/Login";
import Shop from "./Shop";

const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [media, setMedia] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { loggedIn } = useAuth();

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
        
        // Seleccionar el primer color y media por defecto
        if (mediaData.length > 0) {
          const firstMedia = mediaData[0];
          const firstColor = firstMedia.Colors[0].Name;
          setSelectedColor(firstColor);
          setSelectedMedia(firstMedia.Image);
        }

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

            <div className="top-content">
              <p className="product-title">
                {productDetails.Name} / $ {productDetails.Price},00{" "}
              </p>

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
              <button className="add-to-cart" onClick={addToCart}>
                Add to Bag
              </button>
            </div>

            <div className="proroduct-description-container">
              <p className="product-description">
                {productDetails.Description}
              </p>
              <p>Care</p>
              <p className="product-care">{productDetails.Care}</p>
            </div>
          </div>
        ) : (
          <p className="loading">LOADING...</p>
        )}
      </div>
      {loggedIn && <PhotoUploader productId={id} />}{" "}
      <Shop />
    </>
  );
};

export default Product;
