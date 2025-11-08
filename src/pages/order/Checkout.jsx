import React, { useState } from 'react';
import { placeOrder, updateOrderStatus, cancelOrder } from '../services/orderService';
import { useNavigate,useLocation } from 'react-router-dom';

const Checkout = () => {
  const totalAmount = localStorage.getItem("Total");
  const [cart] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });
  const navigate = useNavigate();
  const username = localStorage.getItem("orderUser");

  const request = {
    username: username,
    shippingAddress: "Bangalore",
    items: cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })),
    total: totalAmount
  };

  console.log("🟢 Sending order request:", request);

  const handleCheckout = async () => {
    try {
      await placeOrder(request);
      alert("Order placed successfully");
    } catch (error) {
      console.error("❌ Order failed", error.response?.data || error.message);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={() => navigate('/admin_page')}>Back</button>
      <button onClick={handleCheckout}>Place Order</button>
      <hr />

      {/* Action Buttons after placing order */}


      <hr />
      <h2>Requests</h2>
      <p>Name: {username}</p>
      <ul>
        {cart.map((item, index) => (
          <li key={item.productId ?? index}>
            {item.name} - ₹{item.price} × {item.quantity}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default Checkout;
