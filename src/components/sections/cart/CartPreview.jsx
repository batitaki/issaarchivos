import React, { useState, useEffect } from "react";
import "./Cart.css";

const CartPreview = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.productDetails.Price * item.quantity;
  }, 0);

  return (
    <div className="cart-preview">
      <div className="cart-preview-elements">
        <p className="title"> Your Cart</p>
        <div className="cart-titles">
          <p> Product </p>
          <p> Price </p>
          <p> Color </p>
          <p> Size </p>
          <p> Total </p>
        </div>

        <div className="separator" />

        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-container">
              <img
                className="item"
                src={item.selectedMedia}
                alt={item.productDetails.Name}
              />
            </div>
            <p className="item-price">{item.productDetails.Price} USD</p>
            <div
              className="color-circle"
              style={{ backgroundColor: item.selectedColor }}
            ></div>
            <p className="item-size">
              {item.selectedSize && ` ${item.selectedSize}`}
            </p>
            <p className="item-final-price">
              {" "}
              {item.productDetails.Price * item.quantity}{" "}
            </p>
          </div>
        ))}
        <div className="separator" />
        <div className="subtotal">
          <p className="title"> Subtotal: </p>
          <p className="title"> {subtotal} USD </p>
        </div>
        <button className="checkout">Chek Out</button>
      </div>
    </div>
  );
};

export default CartPreview;
