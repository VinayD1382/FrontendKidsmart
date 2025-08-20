import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      const cachedValid = sessionStorage.getItem("adminValid");

      if (cachedValid === "true" && token) {
        setIsValid(true);
        setIsLoading(false);
        return;
      }

      if (!token) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://backendkidsmart.onrender.com/api/admin/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.valid) {
          setIsValid(true);
          sessionStorage.setItem("adminValid", "true");
        } else {
          localStorage.removeItem("adminToken");
          sessionStorage.removeItem("adminValid");
          setIsValid(false);
        }
      } catch {
        localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminValid");
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    const handleTokenChange = () => verifyToken();
    window.addEventListener("adminTokenChanged", handleTokenChange);

    verifyToken();

    return () => {
      window.removeEventListener("adminTokenChanged", handleTokenChange);
    };
  }, []);

  if (isLoading) {
    return <h3 style={{ color: "white", textAlign: "center" }}>Checking authentication...</h3>;
  }

  return isValid ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
