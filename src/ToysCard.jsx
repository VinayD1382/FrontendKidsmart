import React from "react";
import "../src/home.css";
import { useCart } from "./Components/CartContext";
import { useNavigate } from "react-router-dom";

function ToysCard({ _id, name, image, price }) {
  const { cart, addToCart, removeFromCart, addToWishlist } = useCart();
  const navigate = useNavigate();

  const itemInCart = cart.find((item) => item._id === _id);
const handleBuy = () => {
    navigate("/buyone", {
      state: { _id, name, image, price }
    });
  };
  return (
    <div className="product-card card p-3 text-center shadow-sm">
      <img
        src={image}
        alt={name}
        className="card-img-top mb-2"
        style={{ height: "150px", objectFit: "cover" }}
      />

      <h3 className="h5">{name}</h3>
      <div className="mb-2">
        <span className="text-danger fw-bold">₹{price}</span>
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
          ♥️
        </button>
      </div>
    </div>
  );
}

export default ToysCard;
