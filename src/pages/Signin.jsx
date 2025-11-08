import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const data = {username , password}
    const handleSubmit = (event) => {
    event.preventDefault();  // Prevent page reload
    if ("" in data) {
        alert("Please fill in all fields");
    }
    axios.post("http://localhost:8080/api/signIn", data).then(res => {
        console.log('Sign in OK:',res.data);
        console.info('username: ',username);
        console.info('password: ',password);
        localStorage.setItem('username', username);
        const role = res.data
        if(role === 'admin'){
            navigate('/admin_page')
        }
        if (role === 'customer') {
            navigate('/customer_page')
        }
    }).catch(error => {
        console.error('Signin failed:',error);
        alert('Error signing in - check console')
    });
};

const LogOut = () => {
    alert()
}

return (
    <>
        <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />
                <label>Password: </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit">Sign In</button>
            </form>
    </>
);
}

export default Signin;
