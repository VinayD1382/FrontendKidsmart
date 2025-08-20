 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin({ cart }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  
  const handleRegister = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setMessage("Please enter email and password.");
    return;
  }
  try {
    await axios.post("http://backendkidsmart.onrender.com/api/users/register", {
      email: email.toLowerCase(),
      password,
    });
    setMessage("Registration successful! You can now login.");
    setIsRegister(false);
    resetForm();
  } catch (error) {
    setMessage("Registration failed: " + (error.response?.data?.message || error.message));
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setMessage("Please enter email and password.");
    return;
  }
  try {
    const res = await axios.post("http://backendkidsmart.onrender.com/api/users/login", {
      email: email.toLowerCase(),
      password,
    });
    setMessage(res.data.message);
    navigate(`/userproducts/${email.toLowerCase()}`);
  } catch (err) {
    setMessage("Login failed: " + (err.response?.data?.message || err.message));
  }
};


  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 30,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {!isRegister ? (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 24, color: "#333" }}>User Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" style={{ fontWeight: "600", color: "#555" }}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginTop: 6,
                marginBottom: 18,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <label htmlFor="password" style={{ fontWeight: "600", color: "#555" }}>
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginTop: 6,
                marginBottom: 24,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: 6,
                color: "white",
                fontSize: 18,
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              Login
            </button>
          </form>
          <p
            style={{
              marginTop: 20,
              textAlign: "center",
              fontWeight: "600",
              cursor: "pointer",
              color: "#28a745",
            }}
            onClick={() => {
              setIsRegister(true);
              resetForm();
            }}
          >
            Don't have an account? Register here
          </p>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 24, color: "#333" }}>Register</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="email" style={{ fontWeight: "600", color: "#555" }}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginTop: 6,
                marginBottom: 18,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <label htmlFor="password" style={{ fontWeight: "600", color: "#555" }}>
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginTop: 6,
                marginBottom: 24,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: 6,
                color: "white",
                fontSize: 18,
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              Register
            </button>
          </form>
          <p
            style={{
              marginTop: 20,
              textAlign: "center",
              fontWeight: "600",
              cursor: "pointer",
              color: "#28a745",
            }}
            onClick={() => {
              setIsRegister(false);
              resetForm();
            }}
          >
            Already have an account? Login here
          </p>
        </>
      )}

      {message && (
        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            color: message.includes("failed") || message.includes("not found") ? "red" : "green",
            fontWeight: "600",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
 
}
export default UserLogin; 
