import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function FeedbackForm() {
    const { id } = useParams(); // Get productId from URL
    const productId = parseInt(id); // Ensure it's a number

    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const username = localStorage.getItem('username'); // From localStorage
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !comment) {
            setMessage("❗ Please fill in both fields.");
            return;
        }

        if (!username) {
            setMessage("❗ Username not found. Please log in.");
            return;
        }

        const dto = {
            username: username,
            productId: productId,
            rating: parseInt(rating),
            comment: comment,
            createdAt: new Date().toISOString()
        };

        try {
            await axios.post("http://localhost:8080/addReview", dto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage("✅ Review submitted successfully!");
            setRating('');
            setComment('');
        } catch (err) {
            console.error("❌ Error submitting review:", err);
            setMessage("❌ Failed to submit review.");
        }
    };
    const back = () => {
                navigate(`/product/${id}/reviews`);
            };
    return (
        <div style={{ padding: "1rem" }}>
            <button onClick={back}>Back</button>
            <h3>Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                <label>Rating (1–5):</label><br />
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                /><br /><br />

                <label>Comment:</label><br />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    cols={40}
                ></textarea><br /><br />

                <button type="submit">Submit</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default FeedbackForm;
