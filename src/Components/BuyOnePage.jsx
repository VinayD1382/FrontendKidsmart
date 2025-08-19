import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../Components/CartContext"; 

const BuyOnePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, updateCartQuantity, removeFromCart } = useCart(); 

  const { productId, name, price, image } = location.state || {
    productId: null,
    name: "",
    price: 0,
    image: "",
  };

  const cartItem = cart.find((item) => item.productId === productId);
  const quantity = cartItem ? cartItem.quantity : 1;

  const handlePayment = () => {
    navigate("/buy", {
      state: {
        productId,
        name,
        price,
        image,
        quantity,
        mode: "Cash On Delivery",
        address: {
          name: "Test User",
          street: "123 Street",
          area: "Area 51",
          door: "D-12",
          state: "TestState",
          phone: "9999999999",
        },
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "77vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#064091ff",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "300px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          overflow: "hidden",
        }}
      >
        {image && (
          <img
            src={image}
            alt={name}
            style={{
              maxWidth: "100%",
              maxHeight: "50%",
              objectFit: "contain",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          />
        )}

        <h3 style={{ marginBottom: "8px" }}>{name}</h3>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "15px",
          }}
        >
          Price: ₹{price}
        </p>
        <button
          onClick={handlePayment}
          style={{
            padding: "10px 20px",
            background: "#1aa631ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default BuyOnePage;