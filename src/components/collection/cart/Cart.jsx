import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.productDetails.Price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <h4 className="title"> Your Cart</h4>
      <div className="cart-titles">
        <p className="title"> Product </p>
        <p className="title"> Price </p>
        <p className="title"> Quantity </p>
        <p className="title"> Total </p>
      </div>

      <div className="separator" />

      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="item-container">
            <img
              className="item"
              src={item.productDetails.Image}
              alt={item.productDetails.Name}
            />
          </div>
          <p className="item-price">{item.productDetails.Price} USD</p>
          <div className="decrement">
            <button
              className="decrement-increment"
              onClick={() => handleDecrement(index)}
            >
              - 
            </button>
            <span className="decrement-increment">{item.quantity}</span>
            <button
              className="decrement-increment"
              onClick={() => handleIncrement(index)}
            >
              +
            </button>
          </div>
          <p className="item-final-price"> {item.productDetails.Price} </p>
        </div>
      ))}
      <div className="separator" />
      <div className="subtotal">
        <p className="title"> Subtotal: </p>
        <p className="title"> {subtotal} USD </p>
      </div>
    </div>
  );
};

export default Cart;
