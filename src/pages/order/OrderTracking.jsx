import React, { useEffect, useState } from "react";
import { getOrdersByUsername } from "../services/orderService"; // adjust the path to your service file
import { useNavigate } from "react-router-dom";
const OrderTracking = () => {
  const [order, setOrder] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  useEffect(() => {
    if (!username) return;

    getOrdersByUsername(username)
  .then(res => {
    if (res.data && res.data.length > 0) {
      // Sort by createdAt (latest first) OR by id if your API uses incremental IDs
      const sortedOrders = [...res.data].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); 
        // or use: return b.id - a.id;   if IDs are sequential
      });

      const latestOrder = sortedOrders[0];
      setOrder(latestOrder);
    }
  })
  .catch(err => console.error("❌ Failed to fetch orders", err));

  }, [username]);

  if (!username) return <p>No user logged in.</p>;
  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Tracking</h2>
      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Status:</b> {order.status}</p>
      <div>
        {["PLACED", "SHIPPED", "CANCELLED"].map(step => (
          <span
            key={step}
            style={{
              marginRight: 20,
              color: step === order.status ? "green" : "gray"
            }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
