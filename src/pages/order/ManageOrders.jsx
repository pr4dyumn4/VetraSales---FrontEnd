import React, { useState } from 'react';
import {updateOrderStatus, cancelOrder } from '../services/orderService';
import { useNavigate,useLocation } from 'react-router-dom';

function ManageOrders() {
    const { state } = useLocation();
      const orderId = state?.orderId;
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

      const handleShipOrder = async (orderId) => {
    // Example: check availability
    const deliveryPersonFound = true; // replace with real check
    const stockAvailable = true; // replace with real check

    if (deliveryPersonFound && stockAvailable) {
      try {
        await shipOrder(orderId);
        alert("✅ Order shipped successfully!");
      } catch (error) {
        console.error("❌ Ship failed", error.response?.data || error.message);
      }
    } else {
      alert("⚠️ Cannot ship: No delivery person or insufficient stock.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      alert("🚫 Order canceled. Refund will be processed.");
    } catch (error) {
      console.error("❌ Cancel failed", error.response?.data || error.message);
    }
  };
    return (<>
              <h3>Manage Order</h3>
      <p>Order ID: {orderId}</p>
      <button onClick={() => handleShipOrder(orderId)}>Ship Order</button>
      <button onClick={() => handleCancelOrder(orderId)}>Cancel Order</button>
    </>);
}

export default ManageOrders;

export const shipOrder = (orderId) => updateOrderStatus(orderId, "SHIPPED");