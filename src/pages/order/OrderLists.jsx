import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

function OrderLists() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllOrders()
            .then(res => {
                setOrders(res.data || []); // ensure it's always an array
            })
            .catch(err => {
                console.error("❌ Failed to fetch orders", err);
            });
    }, []);

    return (
        <>
            <h1>Orders</h1>
            <button onClick={() => navigate('/admin_page')}>Back</button>
            <button onClick={() => navigate('/order_page')}>Checkout</button>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Order Items</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>User ID</th>
                        <th>view History</th>
                        <th>Checkouts</th>
                    </tr>
                </thead>
                <tbody>
  {orders.map(order => (
    <tr key={order.orderId}>
      <td>{order.items.map(item => item.productName).join(", ")}</td>
      <td>{order.shippingAddress}</td>
      <td>{order.status}</td>
      <td>{order.userId}</td>
      <td><button onClick={() => navigate('/order_history_page', { state: { userId: order.userId } })}> Order History </button></td>
      <td><button onClick={() => navigate('/order_manager_page', { state: { orderId: order.orderId } })}> Manage Order </button> </td>
    </tr>
  ))}
</tbody>

            </table>
        </>
    );
}

export default OrderLists;
