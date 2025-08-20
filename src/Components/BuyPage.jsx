import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react"; 

function BuyPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email:"",
    name: "",
    street: "",
    area: "",
    door: "",
    state: "",
    phone: "",
    paymentMethod: "Cash On Delivery",
  });

  const [paymentProof, setPaymentProof] = useState(null);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("email", formData.email);
      payload.append("cart", JSON.stringify(cart));
      payload.append(
        "address",
        JSON.stringify({
          name: formData.name,
          street: formData.street,
          area: formData.area,
          door: formData.door,
          state: formData.state,
          phone: formData.phone,
        })
      );
      payload.append("paymentMethod", formData.paymentMethod);
      if (paymentProof) {
        payload.append("paymentProof", paymentProof);
      }

      await axios.post("https://backendkidsmart.onrender.com/api/checkout", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order.");
    }
  };

  const upiId = "vinaydraj14@oksbi"; 
  const payeeName = "KidsMart@Vinay"; 
  const qrValue = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalPrice}&cu=INR`;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-white">Checkout</h2>
     <center> <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow"
        style={{ background: "#222", color: "white" ,maxWidth: "500px",
      width: "100%",  }}
      >
       
<div className="row">
  <div className="col-md-15 mb-3">
    <label>Name</label>
    <input
      type="text"
      className="form-control"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
  <label>Email</label>
  <input
    type="email"
    className="form-control"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
  />
</div>

  <div className="col-md-6 mb-3">
    <label>Door No</label>
    <input
      type="text"
      className="form-control"
      name="door"
      value={formData.door}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label>Street</label>
    <input
      type="text"
      className="form-control"
      name="street"
      value={formData.street}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label>Area | City</label>
    <input
      type="text"
      className="form-control"
      name="area"
      value={formData.area}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label>State</label>
    <input
      type="text"
      className="form-control"
      name="state"
      value={formData.state}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label>Phone</label>
    <input
      type="text"
      className="form-control"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />
  </div>
 

</div>
         <div className="mb-3">
          <label>Payment Method</label>
          <select
            className="form-control"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash On Delivery</option>
            <option>Online Payment</option>
          </select>
        </div>
        {formData.paymentMethod === "Online Payment" && (
          <div className="mb-3 text-center">
            <h5>Scan & Pay</h5>
            <p className="mt-2" style={{fontSize:"25px"}}>Pay ₹{totalPrice}  {}</p>
         <center><QRCodeCanvas value={qrValue} size={200} /></center>   
            <label>Upload Payment Screenshot</label>
            <input
              type="file"
              className="form-control mt-2"
              onChange={(e) => setPaymentProof(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          Submit Order
        </button>
      </form></center>
    </div>
  );
}

export default BuyPage;
