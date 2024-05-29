import React, { useState } from "react";
import { createPayment } from "../../../services/fetchProducts";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './Card.css';

initMercadoPago('APP_USR-4475351e-fae7-4750-909c-fb4c7bf59c06');

const PaymentComponent = () => {
  const [paymentResult, setPaymentResult] = useState(null);

  // Obtener el carrito de compras desde localStorage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Calcular el precio total y otros detalles necesarios
  const name = cartItems.length > 0 ? cartItems[0].productDetails.Name : "No items";
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const price = cartItems.reduce((total, item) => total + (item.quantity * item.productDetails.Price), 0);

  const handlePayment = async () => {
    const paymentData = {
      Name: name,
      Quantity: quantity,
      Price: price,
    };

    try {
      const result = await createPayment(paymentData);
      setPaymentResult(result);
    } catch (error) {
      setPaymentResult({ error: "Error creating payment" });
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <img className="card-img" src={cartItems.length > 0 ? cartItems[0].selectedMedia : "https://res.cloudinary.com/dpnrapsvi/image/upload/v1715549272/Media/r4zrengev1itwkozf72u.png"} alt="" />
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Price:</strong> ${price}</p>
      </div>
      <button className="button-card" onClick={handlePayment}>Create Payment</button>

      {paymentResult && paymentResult.id && (
        <div>
          <p>Payment created successfully! ID: {paymentResult.id}</p>
          <Wallet
            initialization={{ preferenceId: paymentResult.id }}
            customization={{ texts: { valueProp: 'smart_option' } }}
          />
        </div>
      )}

      {paymentResult && paymentResult.error && (
        <div>
          <p>Error creating payment: {paymentResult.error}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
