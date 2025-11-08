import axios from 'axios';

const API = 'http://localhost:8080/api/orders';

export const placeOrder = (orderData) => axios.post(API, orderData);
export const getOrdersByUserId = (userId) => axios.get(`${API}/user/userId/${userId}`);
export const getOrdersByUsername = (username) => axios.get(`${API}/user/username/${username}`);
export const cancelOrder = (orderId) => axios.put(`${API}/${orderId}/cancel`);
export const updateOrderStatus = (orderId, status) => axios.put(`${API}/${orderId}/status?status=${status}`);
export const getAllOrders = () => axios.get(API);
