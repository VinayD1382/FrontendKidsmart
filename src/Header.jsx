import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../src/home.css";
import { useCart } from "./Components/CartContext";
import ChatBox from "./Components/ChatBox";
import AdminChatBox from "./Components/AdminChatBox";

function Header() {
  const { cart = [], wishlist = [] } = useCart() || {};
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  const cartCount = (cart || []).reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const wishlistCount = (wishlist || []).length;

  const navigate = useNavigate();
  const location = useLocation(); // ✅ hook instead of window.location

  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("https://backendkidsmart.onrender.com/api/home");
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const result = allProducts.find((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (result) {
      navigate(`/product/${result._id}`);
    } else {
      alert("No matching product found.");
    }
  };

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAdminLoggedIn(!!localStorage.getItem("adminToken"));
    };

    window.addEventListener("adminTokenChanged", handleTokenChange);
    return () =>
      window.removeEventListener("adminTokenChanged", handleTokenChange);
  }, []);

  return (
    <div className="header">
      <div id="logo-text" className="logo">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fceaff",
              padding: "8px",
              borderRadius: "60%",
            }}
          >
            <img
              src="./OtherImages/sss.jpeg"
              alt="Logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <span
            className="logo-title"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "24px",
              color: "white",
            }}
          >
            KidsMart
            <span className="logo-icon" style={{ paddingLeft: "5px" }}>
              🧸
            </span>
          </span>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/kidswear">KIDS_WEAR</Link>
        <Link to="/stationary">STATIONARY</Link>
        <Link to="/toys">TOYS</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/contact">CONTACT US</Link>
      </div>

      <div
        className="nav-actions"
        style={{ display: "flex", alignItems: "center", gap: "15px" }}
      >
        <div
          className="search-bar"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Search...."
            style={{
              borderRadius: "20px 0 0 20px",
              border: "none",
              padding: "8px 12px",
              outline: "none",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            style={{
              borderRadius: "0 20px 20px 0",
              border: "none",
              padding: "8px 16px",
              backgroundColor: "#6b3e2e",
              color: "white",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/cart">
            <button
              style={{
                background: "navy",
                color: "white",
                borderRadius: "8px",
                padding: "5px 10px",
              }}
            >
              🛒 {cartCount || 0}
            </button>
          </Link>

          <Link to="/wishlist">
            <button
              style={{
                background: "navy",
                color: "white",
                borderRadius: "8px",
                padding: "5px 10px",
              }}
            >
              ♥ {wishlistCount || 0}
            </button>
          </Link>

          <Link to={"/ulogin"}>
            <button
              style={{
                background: "navy",
                color: "white",
                borderRadius: "8px",
                padding: "5px 10px",
              }}
            >
              LOGIN
            </button>
          </Link>
          <Link to={isAdminLoggedIn ? "/admin" : "/admin/login"}>
            <button
              style={{
                background: "navy",
                color: "white",
                borderRadius: "8px",
                padding: "5px 10px",
              }}
            >
              🧑‍💻
            </button>
          </Link>
        </div>
      </div>

      {/* ✅ ChatBox appears only on home "/" */}
      {location.pathname === "/" && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <ChatBox />
        </div>
      )}
        {location.pathname === "/admin" && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <AdminChatBox />
        </div>
      )}
    </div>
  );
}

export default Header;
