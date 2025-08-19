import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };





  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", width: "250px" }}
        />
        <br /><br />
        <button type="submit" style={{ padding: "8px 20px" }}>Send Reset Link</button>
      </form>
      {message && <p style={{ color: "lightgreen" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      
    </div>
    


  );
}

export default ForgotPassword;
