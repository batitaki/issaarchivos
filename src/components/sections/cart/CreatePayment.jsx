import React, { useState } from "react";
import { createPayment } from "../../../services/fetchProducts";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./Card.css";

// Inicializa MercadoPago con tu clave pública
initMercadoPago("APP_USR-4475351e-fae7-4750-909c-fb4c7bf59c06");

const PaymentComponent = () => {
  // Estado para almacenar el resultado del pago y los detalles del comprador
  const [paymentResult, setPaymentResult] = useState(null);
  const [buyerDetails, setBuyerDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
  });

  // Obtener el carrito de compras desde localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Calcular el nombre del producto, cantidad total y precio total
  const name =
    cartItems.length > 0 ? cartItems[0].productDetails.Name : "No items";
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const price = cartItems.reduce(
    (total, item) => total + item.quantity * item.productDetails.Price,
    0
  );

  // Manejar el evento de creación de pago
  const handlePayment = async () => {
    const paymentData = {
      Name: name,
      Quantity: quantity,
      Price: price,
      BuyerDetails: buyerDetails, // Incluye los detalles del comprador
    };

    try {
      const result = await createPayment(paymentData);
      setPaymentResult(result);
    } catch (error) {
      setPaymentResult({ error: "Error creating payment" });
    }
  };

  // Manejar cambios en los inputs de los detalles del comprador
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails({
      ...buyerDetails,
      [name]: value,
    });
  };

  return (
    <>
      <div className="card-container">
        <div className="buyer-details">
          <div className="input-container">
            <label htmlFor="email">Contact</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={buyerDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={buyerDetails.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
          <label htmlFor="firstName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={buyerDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
          <label htmlFor="firstName">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={buyerDetails.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
          <label htmlFor="firstName">Apartment</label>
            <input
              type="text"
              name="apartment"
              placeholder="Apartment"
              value={buyerDetails.apartment}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
          <label htmlFor="firstName">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={buyerDetails.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="card">
          <div className="card-img-container">
            <img
              className="card-img"
              src={
                cartItems.length > 0
                  ? cartItems[0].selectedMedia
                  : "https://res.cloudinary.com/dpnrapsvi/image/upload/v1715549272/Media/r4zrengev1itwkozf72u.png"
              }
              alt=""
            />
          </div>
          <div className="card-details">
            <div className="card-detail-item">
              <span className="detail-label">Product:</span>
              <span className="detail-value">{name}</span>
            </div>
            <div className="card-detail-item">
              <span className="detail-label">Quantity:</span>
              <span className="detail-value">{quantity}</span>
            </div>
            <div className="card-detail-item">
              <span className="detail-label">Total:</span>
              <span className="detail-value">${price}</span>
            </div>
            <div className="card-detail-item">
              <span className="detail-label">Subtotal:</span>
              <span className="detail-value">${price}</span>
            </div>
          </div>
      <button className="button-card" onClick={handlePayment}>
        Express Checkout
      </button>

      {/* Sección para el método de pago */}
      {paymentResult && paymentResult.id && (
        <div>
          <Wallet
            initialization={{ preferenceId: paymentResult.id }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </div>
      )}

      {/* Mostrar mensaje de error si falla la creación del pago */}
      {paymentResult && paymentResult.error && (
        <div>
          <p>Error creating payment: {paymentResult.error}</p>
        </div>
      )}
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
