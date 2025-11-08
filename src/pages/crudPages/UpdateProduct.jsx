import React,{useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
function UpdateProduct() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const prod = state?.product;
    const [id] = useState(prod?.id || '')
    const [name,setName] = useState(prod?.name || '')
    const [price,setPrice] = useState(prod?.price || '')
    const [description, setDescription] = useState(prod?.description || '')
    const [image, setImage] = useState(prod?.image || '')
    const handleSubmit = (event) => {
        event.preventDefault();
        const product = {id,name,price: parseInt(price, 10),description,image}
        axios.post("http://localhost:8080/api/updateProduct", product)
        .then(res => {
        console.log("Update Product")
        console.log(res.data);
        navigate('/admin_page')
        })
        .catch(err => {
        console.error(err);
        });
    };
    return (<>
    <button onClick={() => navigate('/admin_page')}>
        Back
        </button>
    <h3>Update Products</h3>
        <form onSubmit={handleSubmit}>
            <label>Name of the Product: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <br /><br />
            <label>Description: </label>
            <textarea  value={description} onChange={(e) => setDescription(e.target.value)}/>
            <br /><br />
            <label>Price: </label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <br /><br />
            <label>Image: </label>
            <input type="Text" value={image} onChange={(e) => setImage(e.target.value)}/>
            <br /><br />
            <button type="submit">ADD Product</button>
        </form>
    </>);
}

export default UpdateProduct;