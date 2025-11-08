import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [username] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState("");
  // controlled inputs
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // original data for change detection
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/userData?username=${username}`)
      .then((res) => {
        const data = res.data;
        setId(data.id);
        setPassword(data.password || "");
        setEmail(data.email || "");
        setGender(data.gender || "");
        setDob(data.dob || "");
        setRole(data.role || "");
        setOriginalData({
            password: data.password || "",
            email: data.email || "",
            gender: data.gender || "",
            dob: data.dob || "",
            role: data.role || "",
        });
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, [username]);

  const handleUpdate = (e) => {
  e.preventDefault();

  const isChanged =
    password !== originalData.password ||
    email !== originalData.email ||
    gender !== originalData.gender ||
    dob !== originalData.dob ||
    role !== originalData.role;

  if (!isChanged) {
    alert("No changes detected.");
    return;
  }

  const updatedUser = { id, username, password, email, gender, dob, role };

  axios.post(`http://localhost:8080/updateUser`, updatedUser)
    .then(() => {
      setEditMode(false);
      setOriginalData({ password, email, gender, dob, role });
      alert("Profile Updated!");
    })
    .catch((err) => console.error("Update failed:", err));
};

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    axios
      .get(`http://localhost:8080/deleteUser?id=${id}`)
      .then(() => {
        alert("Profile Deleted");
        localStorage.clear();
        navigate("/sign_in_page");
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <>
    <button
  type="button"
  onClick={() => {
    if (role === "admin") {
      navigate("/admin_page");
    } else if (role === "customer") {
      navigate("/customer_page");
    }
  }}
>
  Back
</button>
      <h2>User Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Username: </label>
        <input type="text" value={username} disabled />
        <br /><br />
        <label>Password: </label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!editMode}
        />
        <br /><br />

        <label>Email: </label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editMode}
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
            disabled={!editMode}
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
            disabled={!editMode}
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
            disabled={!editMode}
          />
          Other
        </label>
        <br /><br />

        <label>Date of Birth: </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          disabled={!editMode}
        />
        <br /><br />

        <label>Role: </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={(e) => setRole(e.target.value)}
            disabled={!editMode}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="customer"
            checked={role === "customer"}
            onChange={(e) => setRole(e.target.value)}
            disabled={!editMode}
          />
          Customer
        </label>
        <br /><br />

        {editMode ? (
          <button type="submit">Update Profile</button>
        ) : (
          <button type="button" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
        &nbsp;
        <button type="button" onClick={handleDelete}>Delete Profile</button>
      </form>
    </>
  );
}

export default UserProfile;
