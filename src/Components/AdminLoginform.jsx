import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {auth,googleProvider,RecaptchaVerifier,signInWithPhoneNumber} from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();
  const confirmationResultRef = useRef(null);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, 
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha verified:", response);
          }
        }
      );
    }
  }, []);
const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha resolved");
          },
          "expired-callback": () => {
            setError("Recaptcha expired, please try again.");
          },
        },
        auth
      );
    }
  };
const sendOtp = async () => {
    setError("");
    setupRecaptcha();

    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP sent! To Your Phone .");
    } catch (err) {
      setError("Failed to send OTP: " + err.message);
    }
  };
  
const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();
      const res = await axios.post("http://backendkidsmart.onrender.com/api/admin/phone-login", {
        idToken
      });
      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful!");
    } catch (err) {
      console.error("OTP verification failed", err);
      alert("OTP verification failed");
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://backendkidsmart.onrender.com/api/admin/login", {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("adminToken", response.data.token);
        sessionStorage.setItem("adminValid", "true");
        window.dispatchEvent(new Event("adminTokenChanged"));
        navigate("/admin");
      } else {
        setError("Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.email !== "vinaydraj1382@gmail.com") {
        setError("Unauthorized email for Google sign-in.");
        return;
      }

      const idToken = await user.getIdToken();
      const response = await axios.post(
        "http://backendkidsmart.onrender.com/api/admin/google-login",
        { idToken }
      );

      if (response.data?.token) {
        localStorage.setItem("adminToken", response.data.token);
        sessionStorage.setItem("adminValid", "true");
        window.dispatchEvent(new Event("adminTokenChanged"));
        navigate("/admin");
      } else {
        setError("Google sign-in failed. Unauthorized.");
      }
    } catch (error) {
      console.error("Google sign-in error:", error.response?.data || error.message);
      setError("Google sign-in failed. Please try again.");
    }
  };

  
 const handleVerifyOtp = async () => {
  try {
    const result = await confirmationResult.confirm(otp); 
    const idToken = await result.user.getIdToken();

    const response = await axios.post("http://backendkidsmart.onrender.com/admin/verify-otp", { idToken });

    if (response.data?.token) {
      localStorage.setItem("adminToken", response.data.token);
      sessionStorage.setItem("adminValid", "true");
      window.dispatchEvent(new Event("adminTokenChanged"));
      navigate("/admin"); 
    } else {
      setError("OTP verification failed. Unauthorized.");
    }
  } catch (err) {
    console.error("OTP verification failed:", err);
    setError("OTP verification failed.");
  }
};

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
    
      <div id="recaptcha-container" style={{ display: "none" }}></div>

      <h2 className="text-center mb-4" style={{ color: "white" }}>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="admin@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
      </form>

      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <button
          type="button"
          className="btn btn-link"
          style={{ color: "white" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </div>

      <hr style={{ borderColor: "white" }} />

      {/* Google Sign-in */}
      <button
        type="button"
        className="btn btn-danger w-100 mb-3"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>

      <hr style={{ borderColor: "white" }} />

      <div style={{ textAlign: "center", marginTop: "20px" }} >
<center><h2 style={{ marginBottom: "10px", color:"white" , fontSize:"20px"}}>Phone</h2></center>  


  <input
    style={{
      padding: "12px",
      marginBottom: "10px",
      border: "none",
      borderRadius: "6px",
      width: "250px",
      fontSize: "14px",
      outline: "none"
    }}
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Phone number"
  />

  <button
    onClick={sendOtp}
    style={{
      padding: "12px",
      width: "250px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      marginBottom: "15px"
    }}
  >
    Send OTP
  </button>

  {confirmationResult && (
    <>
      <input
        style={{
          padding: "12px",
          marginBottom: "10px",
          border: "none",
          borderRadius: "6px",
          width: "250px",
          fontSize: "14px",
          outline: "none"
        }}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <button
        onClick={handleVerifyOtp}
        style={{
          padding: "12px",
          width: "250px",
          backgroundColor: "#28a745", 
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Verify OTP
      </button>
    </>
  )}
</div>

    </div>
  );
};

export default AdminLoginForm;
