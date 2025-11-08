import React, { useEffect, useState } from 'react';
import { getOrdersByUserId, cancelOrder, updateOrderStatus } from '../services/orderService';
import { useLocation,useNavigate } from 'react-router-dom';  // ✅ Added import

const OrderHistory = () => {
    const { state } = useLocation();
    const userId = state?.userId;
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (userId) {
            getOrdersByUserId(userId)
                .then(res => setOrders(res.data))
                .catch(err => console.error("❌ Failed to load orders", err));
        }
    }, [userId]);

    const handleShip = async (orderId) => {
        try {
            await updateOrderStatus(orderId, "SHIPPED");
            alert("✅ Order marked as shipped!");
            refreshOrders();
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    const handleCancel = async (orderId) => {
        try {
            await cancelOrder(orderId);
            alert("❌ Order canceled. Refund will be processed.");
            refreshOrders();
        } catch (err) {
            console.error(err);
            alert("Failed to cancel order");
        }
    };

    const refreshOrders = () => {
        if (userId) {
            getOrdersByUserId(userId).then(res => setOrders(res.data));
        }
    };

    return (
        <div>
            <h2>Order History</h2>
            <button onClick={() => navigate('/order_lists_page')}>Back</button>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={{border: "1px solid #ccc", margin: "10px", padding: "10px"}}>
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                        <p><strong>Created At:</strong> {order.createdAt}</p>
                        <ul>
                            {order.items?.map((item, idx) => (
                                <li key={idx}>
                                    {item.productName} - ₹{item.price} × {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <div>
                            {order.status !== "SHIPPED" && (
                                <button onClick={() => handleShip(order.id)}>Ship Order</button>
                            )}
                            {order.status !== "CANCELLED" && (
                                <button onClick={() => handleCancel(order.id)}>Cancel Order</button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
