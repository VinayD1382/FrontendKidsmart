import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";  
import "../home.css";

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "white" }}>
        🛒 My Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center text-white">Your cart is empty.</p>
      ) : (
        <>
          <div className="row justify-content-center g-4">
            {cart.map((item) => (
              <div key={item.productId} className="col-md-2 d-flex justify-content-center">
                <div className="card text-center shadow-sm" style={{ width: "18rem" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top mb-2"
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      paddingLeft: "18px",
                      paddingRight: "18px"
                    }}
                  />
                  <h5>{item.name}</h5>
                  <p className="text-danger fw-bold">₹{item.price}</p>

                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => updateCartQuantity(item.productId, -1)}
                    >
                      −
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => updateCartQuantity(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <center className="mt-4 text-white">
            <h4>Total: ₹{totalPrice}</h4>
            <button
  className="btn btn-success mt-2"
  onClick={() => {
    console.log("Cart before navigate:", cart);  // DEBUG LOG
    navigate("/buy");
  }}
>
  CHECKOUT
</button>



          </center>
        </>
      )}
    </div>
  );
}

export default CartPage;
