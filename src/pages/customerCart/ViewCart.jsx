import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ViewCart() {
  const username = localStorage.getItem('username') || '';
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const scriptId = "razorpay-checkout-js";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }
  fetchCart()
}, []);


  const fetchCart = () => {
    axios.get('http://localhost:8080/viewCart', { params: { username } })
      .then(res => setItems(res.data))
      .catch(err => console.error('Fetch cart failed:', err));
  };

  const removeItem = (id) => {
    axios.get(`http://localhost:8080/removeItem?prod_id=${id}`)
      .then(() => setItems(items => items.filter(item => item.productId !== id)))
      .catch(err => console.error('Failed to remove item', err));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) {
      // Remove item instead
      removeItem(productId);
      return;
    }
    const payload = { username, productId, quantity: newQty };
    axios.post('http://localhost:8080/updateCartItem', payload)
      .then(() => fetchCart())
      .catch(err => console.error('❌ Update cart failed:', err));
  };

  const openOrderTab = () => {
    const productIds = items.map(item => item.productId);
    localStorage.setItem("orderUser", username);
    localStorage.setItem("orderProductIds", JSON.stringify(productIds));
    localStorage.setItem("cartItems", JSON.stringify(items));
    window.open("/order_tracking_page", "_blank");
  };
    const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
const makePayment = async () => {
  try {
    const amount = Math.round(calculateTotal() * 100)
    localStorage.setItem("Total", calculateTotal())
    if (amount > 10000000) {
      alert("❌ Order amount exceeds Razorpay limit of ₹1,00,000.");
      return;
    }

    const { data: order } = await axios.post('/create-order',null,{params:{amount}});

    const options = {
      key: "rzp_test_90lAmUtfOQvFlI",
      amount: order.amount,
      currency: order.currency,
      name: "My Store",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert(`✅ Payment successful: ${response.razorpay_payment_id}`);
        openOrderTab();
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      console.error(response.error);
      alert(`❌ Payment failed: ${response.error.description}`);
    });

    razor.open();

  } catch (error) {
    console.error("Error in payment process:", error);
    alert("Failed to initiate payment");
  }
};
  const back = () => {
    navigate('/customer_page');
  };

  return (
    <>
      <button onClick={back}>Back</button>
      <div style={{ padding: '20px', color: 'black' }}>
        <h2>{username}'s Cart</h2>
        {items.length === 0 ? (
          <p className="cartEmpty">🛒 Your cart is empty.</p>
        ) : (
          <>
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>Image</th><th>Name</th><th>Price</th>
                  <th>Qty</th><th>Subtotal</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.productId}>
                    <td><img src={it.image} alt={it.name} width="80" /></td>
                    <td>{it.name}</td>
                    <td>{it.price}</td>
                    <td>{it.quantity}</td>
                    <td>{it.price * it.quantity}</td>
                    <td>
                      <button onClick={() => updateQuantity(it.productId, it.quantity + 1)}>+</button>
                      <button onClick={() => updateQuantity(it.productId, it.quantity - 1)}>-</button>
                      <button onClick={() => removeItem(it.productId)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total: ₹{calculateTotal()}</h3>
            <button onClick={makePayment} style={{ padding: '10px 20px', marginTop: '10px' }}>
              💳 Proceed to Payment
            </button>
          </>
        )}
      </div>
    </>
  );
}
export const items = () => {
  return ViewCart.items;
};
