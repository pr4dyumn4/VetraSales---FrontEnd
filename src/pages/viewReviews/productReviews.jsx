import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductReviews() {
  const navigate = useNavigate();
  const { id } = useParams(); // product ID from URL
  const [reviews, setReviews] = useState([]);
  const [role, setRole] = useState(null); // store user role
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    // 1. Fetch user role (assuming you have userData API)
    if (currentUser) {
      axios
        .get(`http://localhost:8080/userData?username=${currentUser}`)
        .then(res => {
          setRole(res.data.role);
        })
        .catch(err => {
          console.error("Failed to fetch user role", err);
        });
    }

    // 2. Fetch product reviews
    axios
      .get(`http://localhost:8080/product/${id}`)
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (data) {
          setReviews([data]);
        } else {
          setReviews([]);
        }
      })
      .catch(err => {
        console.error("Error fetching reviews", err);
        setReviews([]);
      });
  }, [id, currentUser]);

  const back = () => {
    if (role === "customer") {
      navigate('/customer_page');
    } else if (role === "admin") {
      navigate('/admin_page');
    }
  };

  const addFeedback = () => {
    navigate(`/review/${id}`);
  };

  function getAverageStars(reviews) {
    if (!Array.isArray(reviews) || reviews.length === 0) return 'No ratings yet ⭐';
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    const avg = total / reviews.length;
    const fullStars = Math.round(avg);
    return '⭐'.repeat(fullStars) + '✩'.repeat(5 - fullStars);
  }

  return (
    <>
      <button onClick={back}>Back</button>
      {role === "Customer" && (
        <button onClick={addFeedback}>Give FeedBack</button>
      )}
      <h1>Product Reviews</h1>
      <p>Average Rating: {getAverageStars(reviews)}</p>
      <hr />
      <div className="reviews-list">
        {reviews.map((r, index) => (
          <div key={r.id || index}>
            <p>Customer name: {r.username === currentUser ? "You" : r.username}</p>
            <p>Email: {r.username === currentUser ? "Your Email" : r.email}</p>
            <p>Rating: {r.rating}/5</p>
            <p>Comment: {r.comment}</p>
            <hr style={{ borderColor: "#444" }} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductReviews;
