import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();

    const user = { username, email, password, gender, dob, role };
    if ("" in user) {
        alert("Please fill in all fields");
    }
    axios.post("http://localhost:8080/signUp", user,{headers: { "Content-Type": "application/json" }})
        .then(res => {
        console.log("Sign UP")
        console.log(res.data);
        console.info(user.roll)
        navigate('/sign_in_page')
        })
        .catch(err => {
        console.error(err);
        });
    };

    return (
    <>
        <h2>Sign Up</h2>
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

        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <label>Gender: </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender === "Other"}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>
        <br /><br />

        <label>Date of Birth: </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <br /><br />

        <label>Role: </label>
        
<label>
  <input
    type="radio"
    name="role"
    value="admin"
    checked={role === 'admin'}
    onChange={(e) => setRole(e.target.value)}
  />
  Admin
</label>

<label>
  <input
    type="radio"
    name="role"
    value="customer"
    checked={role === 'customer'}
    onChange={(e) => setRole(e.target.value)}
  />
  Customer
</label>
        <br /><br />
        <button type="submit">SIGN UP</button>
      </form>
    </>
  );
}

export default Signup;
