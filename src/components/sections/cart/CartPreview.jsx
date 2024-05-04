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
        {cartItems.map((item, index) => (
          <>
            <div key={index} className="cart-preview-item">
              <div className="item-container">
                <img className="item" src={item.selectedMedia} />
              </div>
              <div className="cart-r-elements">
                <p className="item-price"> {item.productDetails.Name} | ${item.productDetails.Price}  </p>

                <div className="cart-preview-color-size">
                  COLOR
                  <div
                    className="preview-color-circle"
                    style={{ backgroundColor: item.selectedColor }}
                  ></div>
                  SIZE
                  <p className="item-size">
                    {item.selectedSize && ` ${item.selectedSize}`}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}

        <div className="subtotal">
          <p className="item-price"> SUBTOTAL </p>
          <p className="item-price">${subtotal}  </p>
        </div>
        <button className="preview-checkout">Check Out</button>
      </div>
    </div>
  );
};

export default CartPreview;
