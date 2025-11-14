import SearchBar from "./search/SearchBar"; // adjust path
import SearchResultsList from "./search/SearchResultsList"; // your existing component
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function Customer() {
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);
  const [pendingCart, setPendingCart] = useState({});
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [productRatings, setProductRatings] = useState({});

useEffect(() => {
  fetchProducts();
  const storedUsername = localStorage.getItem('username') || '';
  setUsername(storedUsername);
}, []);

useEffect(() => {
  if (products.length > 0) {
    fetchReviews(products);
  }
}, [products]);

      const handleViewReviews = (productId) => {
        navigate(`/product/${productId}/reviews`);
      };
    const fetchProducts = () => {
        axios.get('http://localhost:8080/getAllProducts')
            .then(res => {
                setProducts(res.data)
                
            })
            .catch(err => console.error('Failed to fetch products:', err));
    };
    const fetchReviews = (products) => {
      products.forEach(product => {
        axios.get(`http://localhost:8080/product/${product.id}`)
        .then(response => {
          let reviews = response.data;
          if (!Array.isArray(reviews)) {
            reviews = reviews ? [reviews] : [];
          }
          const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
          const avg = reviews.length > 0 ? total / reviews.length : 0;
          setProductRatings(prev => ({ ...prev, [product.id]: avg }));
        })
        .catch(error => {
          console.error("Failed to fetch reviews for product ID:", product.id);
        });
      });
    };

    const handleAddClick = (pid) => {
        setPendingCart(prev => ({ ...prev, [pid]: true }));
        setCartItems(prev => ({ ...prev, [pid]: 1 }));  // Default quantity 1
    };
    const handleQuantityChange = (pid, val) => {
        const v = Math.max(1, parseInt(val, 10) || 1);
        setCartItems(prev => ({ ...prev, [pid]: v }));
    };
    const handleConfirmCart = (prod) => {
    const data = {
        username: username,
        productId: prod,
        quantity: cartItems[prod] || 1
    };

    axios.post('http://localhost:8080/api/addToCart', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log('✅ Received message:', res.data);
        fetchProducts();
        setPendingCart(prev => {
            const updated = { ...prev };
            delete updated[prod.id];
            return updated;
        });
    })
    .catch(err => console.error('❌ Add to cart failed:', err));
};


function getStars(avg) {
  if (!avg || avg <= 0) return 'No ratings yet ⭐';
  const fullStars = Math.round(avg);
  return '⭐'.repeat(fullStars) + '✩'.repeat(5 - fullStars);
}


return (
  <>
  <button onClick={() => navigate('/sign_in_page')}>Log Out</button>
  <button onClick={() => navigate('/user_profile_page')} className="user-profile">User Profile</button>
  <div className="customer-container">
    <h1>Welcome, {username}</h1>

    <div className="search-bar-container">
      <SearchBar setResults={setResults} setSearchStatus={setSearchStatus} />
    </div>

    <button className="view-cart-btn" onClick={() => navigate('/view_cart_page')}>
      View Cart
    </button>

    {results?.length > 0 ? (
      <>
        <h3>🔍 Search Results</h3>
        {searchStatus === "found" && (
          <SearchResultsList
            results={results}
            pendingCart={pendingCart}
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            handleConfirmCart={handleConfirmCart}
            handleAddClick={handleAddClick}
          />
        )}
      </>
    ) : results?.length === 0 ? (
      <p>❌ Product not found.</p>
    ) : (
      <>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Avg Rating</th>
              <th>Reviews</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(p => (
                <tr key={p.id}>
                  <td><img src={p.image} alt={p.name} width="80" /></td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>
                      {productRatings[p.id] !== undefined ? getStars(productRatings[p.id]) // use function to convert avg -> stars
                      : "Loading..."}
                  </td>
                  <td>
                      <button onClick={() => handleViewReviews(p.id)}>View Reviews</button>
                  </td>
                  <td>
                      {pendingCart[p.id] ? (
                      <>
                        <input type="number" min="1" value={cartItems[p.id]} onChange={e => handleQuantityChange(p.id, e.target.value)} style={{ width: '3em', marginRight: '0.5em' }}/>
                        <button onClick={() => handleConfirmCart(p.id)}>Confirm</button>
                      </>
                        ) : (
                      <button onClick={() => handleAddClick(p.id)}>Add to Cart</button>
                        )}
  </td>
</tr>

              ))
            ) : (
              <tr>
                <td colSpan="5">❌ No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    )}
  </div>
</>

);

}

export default Customer;
