import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://backendkidsmart.onrender.com/api/checkout");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      await axios.patch(`https://backendkidsmart.onrender.com/api/checkout/${orderId}/verify`);
      alert("Payment verified successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Failed to verify payment:", error);
      alert("Error verifying payment");
    }
  };

  // Reject payment
  const rejectPayment = async (orderId) => {
    try {
      await axios.patch(`https://backendkidsmart.onrender.com/api/checkout/${orderId}/reject`);
      alert("Payment rejected successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Failed to reject payment:", error);
      alert("Error rejecting payment");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        <h2 style={{ borderBottom: "2px solid green", paddingBottom: "10px" }}>
          Orders
        </h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => {
            const totalPrice =
              order.totalPrice ||
              order.cart?.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

            return (
              <div
                key={order._id}
                style={{
                  backgroundColor: "#1f2d3d",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <strong>Order ID:</strong> {order._id}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                  <div>
                    <strong>Payment Mode:</strong> {order.mode || "N/A"}
                  </div>
                  <div>
                    <strong>Total Price:</strong> ₹{totalPrice}
                  </div>
                  <div>
                    <strong>Products:</strong> {order.cart?.length || 0}
                  </div>
                </div>

                {/* Main Section */}
                <div style={{ display: "flex", gap: "20px" }}>
                  {/* Address + Products */}
                  <div style={{ flex: 1 }}>
                    <p>
                      <strong>Shipping Address:</strong>
                    </p>
                    <p>
                      Name: {order.address?.name}
                      <br />
                      Door: {order.address?.door}
                      <br />
                      Street: {order.address?.street}
                      <br />
                      Area: {order.address?.area}
                      <br />
                      State: {order.address?.state}
                      <br />
                      Phone: {order.address?.phone}
                    </p>

                    <p>
                      <strong>Products:</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px" }}>
                      {order.cart?.map((item, idx) => (
                        <li key={idx}>
                          {item.name} — Qty: {item.quantity} — ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Payment Proof */}
                  {order.paymentProof && (
                    <div style={{ minWidth: "320px" }}>
                      <strong>Payment Proof:</strong>
                      <br />
                      <img
                        src={`http://backendkidsmart.onrender.com${order.paymentProof}`}
                        alt="Payment Proof"
                        style={{
                          width: "500px",
                          maxHeight: "350px",
                          marginTop: "10px",
                          objectFit: "contain",
                          borderRadius: "5px",
                          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {order.mode === "Online Payment" &&
                  order.paymentStatus === "Pending" &&
                  order.paymentProof && (
                    <>
                      <button
                        style={{
                          marginTop: "10px",
                          padding: "8px 15px",
                          backgroundColor: "green",
                          border: "none",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => verifyPayment(order._id)}
                      >
                        Verify Payment
                      </button>
                      <button
                        style={{
                          marginTop: "10px",
                          marginLeft: "10px",
                          padding: "8px 15px",
                          backgroundColor: "red",
                          border: "none",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => rejectPayment(order._id)}
                      >
                        Reject Payment
                      </button>
                    </>
                  )}
                {/*
                {order.paymentStatus === "Verified" && (
                  <p style={{ marginTop: "10px", color: "lightgreen" }}>
                    ✅ Payment Verified
                  </p>
                )}
                {order.paymentStatus === "Rejected" && (
                  <p style={{ marginTop: "10px", color: "red" }}>
                    ❌ Payment Rejected
                  </p>
                )}*/}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
