import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Components/CartContext"; // ✅ Import the provider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider> {/* ✅ Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </BrowserRouter>
);
