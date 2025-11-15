import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddProduct() {
    const [name,setName] = useState()
    const [price,setPrice] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [adminUsername] = useState(localStorage.getItem('username') || '')
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const product = {name:name,price:price,description:description,image:image,adminName:adminUsername}
        if ("" in product) {
            alert("Please fill all fields")
        }
        axios.post("http://localhost:8080/addProduct", product,{headers: { "Content-Type": "application/json" }})
        .then(res => {
        console.log("Add Product")
        console.log(res.data);
        alert("Product Added Successfully!!")
        })
        .catch(err => {
        console.error(err);
        });
    };
    return (<>
    <button onClick={() => navigate('/admin_page')}>
        Back
        </button>
    <h3>Add Products</h3>
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

export default AddProduct;