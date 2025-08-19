import React, { useEffect } from "react";
import { useCart } from "./Components/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../src/home.css";
import ChatBox from "./Components/ChatBox"; 

function ProductCard({ _id, name, image, price }) {
  const { addToCart, addToWishlist } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const originalPrice = price * 2;
  const discountPrice = price;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      const elementId = searchQuery.toLowerCase().replace(/\s+/g, "-");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [location.search]);

  const handleBuy = () => {
    navigate("/buyone", {
      state: { _id, name, image, price }
    });
  };

  return (

    <div
      id={name.toLowerCase().replace(/\s+/g, "-")}
      className="product-card card p-3 text-center shadow-sm" 

    >
      <img
        src={image}
        alt={name}
        className="card-img-top mb-2"
        style={{ height: "180px", objectFit: "cover" }}
      />

      <h3 className="h5">{name}</h3>
      <div className="mb-2">
        <span className="text-muted text-decoration-line-through me-2">
          ₹{originalPrice}
        </span>
        <span className="text-danger fw-bold">₹{discountPrice}</span>
        <span className="badge bg-success ms-2">50% OFF</span>
      </div>

      <div className="d-flex justify-content-center gap-2 mt-2">
        <button
          className="btn btn-success btn-sm"
          onClick={() => addToCart({ _id, name, image, price })}
        >
          ADD
        </button>

        <button
          className="btn btn-success text-white"
          onClick={() => {
            addToCart({ _id, name, image, price });
            handleBuy();
            alert("Proceeding to checkout for " + name);
          }}
        >
          BUY
        </button>

        <button
          className="btn btn-danger btn-lg"
          onClick={() => addToWishlist({ _id, name, image, price })}
        >
          ♥
        </button>

      </div>
      
      </div>

  );
}

export default ProductCard;
