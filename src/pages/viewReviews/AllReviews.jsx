import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindProduct from '../crudPages/FindProduct';
import Excel from '../export/Excel';
function AllReviews() {
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/allReviews")
        .then(response => {
            setReviews(response.data);
        })
        .catch(err => {
        console.error("Error fetching reviews", err);
            setReviews([]);
        });
    },[]);

    const back = () => {
        navigate('/admin_page')
    }
    return (<>
    <button onClick={back}>Back</button>
    <Excel reviews={reviews} />
        <h1>All Products Reviews</h1>
        <hr />
        <div className="reviews-list">
        {reviews.map((r, index) => (
            <div key={r.id || index}>
            <FindProduct productId={r.productId}/>
            <p>Customer name: {r.username}</p>
            <p>Email: {r.email}</p>
            <p>Rating: {r.rating}/5</p>
            <p>Comment: {r.comment}</p>
            <hr style={{ borderColor: "#444" }} />
        </div>
        ))}
        <br />
    </div>
    </>);
}

export default AllReviews;