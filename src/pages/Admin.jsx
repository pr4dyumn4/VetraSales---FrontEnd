import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Admin() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
  // 1. Load all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('https://vetrasales-backend-production.up.railway.app/api/product/getAllProducts')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  };

  // 2. Delete by ID, then refresh
  const handleDelete = (productId) => {
    axios
      .get('https://vetrasales-backend-production.up.railway.app/api/product/deleteProduct', { params: { productId } })
      .then(() => fetchProducts())
      .catch(err => console.error('Delete failed:', err));
  };

  // 3. Go to update page with product in state
  const handleUpdate = (product) => {
    navigate('/update_product_page', { state: { product } });
  };

  const handleViewReviews = (productId) => {
        navigate(`/product/${productId}/reviews`);
      };

  return (
    <div className="admin-page">
        <h2>Admin Dashboard</h2>
        <button onClick={() => navigate('/add_product_page')}> Add New Product</button>
        <button onClick={() => navigate('/all_reviews_page')}> Customer Reviews</button>
        <button onClick={() => navigate('/user_profile_page')} className="user-profile">User Profile</button>
        <button onClick={() => navigate('/order_lists_page')}>Orders</button>
        <button onClick={() => navigate('/user_management_page')}>User Management</button>
        <table border="1" cellPadding="5" style={{ marginTop: '1em' }}>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody>
            {products.map(p => (
                <tr key={p.id}>
                <td>
                    <img src={p.image} alt={p.name} width="80" />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>
                    <button className="add-product-form" onClick={() => handleUpdate(p)}>Update</button>
                    <button className="update-product-form" onClick={() => handleDelete(p.id)}>Delete</button>
                    <button onClick={() => handleViewReviews(p.id)}>View Reviews</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
}

export default Admin;