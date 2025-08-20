import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
   
  const userId = "guest"; 

  const CART_API = "https://backendkidsmart.onrender.com/api/cart";
  const WISHLIST_API = "https://backendkidsmart.onrender.com/api/wishlist";

  const fetchCart = async () => {
    try {
      const res = await axios.get(CART_API, { params: { userId } });
      setCart(res.data);
    } catch (err) {
      console.error("Fetch Cart Error:", err.message);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(WISHLIST_API, { params: { userId } });
      setWishlist(res.data);
    } catch (err) {
      console.error("Fetch Wishlist Error:", err.message);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const addToCart = async (product) => {
    try {
      const res = await axios.post(`${CART_API}/add`, {
        userId,
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price
      });

      setCart((prev) => {
        const exists = prev.find((item) => item.productId === product._id);
        return exists
          ? prev.map((item) =>
              item.productId === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prev, res.data];
      });
    } catch (err) {
      console.error("Add to Cart Error:", err.response?.data || err.message);
    }
  };

  const updateCartQuantity = async (productId, change) => {
  try {
    const res = await axios.put(`${CART_API}/update`, {
      userId,
      productId,
      change
    });

    if (Array.isArray(res.data)) {
      setCart(res.data); 
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: res.data.quantity }
            : item
        )
      );
    }
  } catch (error) {
    console.error("Error updating quantity:", error.response?.data || error.message);
  }
};

const removeFromCart = async (productId) => {
  try {
    await axios.delete(`${CART_API}/remove/${productId}`, {
      data: { userId } 
    });

    setCart((prev) => prev.filter((item) => item.productId !== productId));
  } catch (err) {
    console.error("Remove Cart Error:", err.response?.data || err.message);
  }
};


  const addToWishlist = async (product) => {
    try {
      const res = await axios.post(`${WISHLIST_API}/add`, {
        userId,
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price
      });

      setWishlist((prev) => {
        const exists = prev.find((item) => item.productId === product._id);
        return exists ? prev : [...prev, res.data];
      });

      alert(`"${product.name}" added to wishlist!`);
    } catch (err) {
      console.error("Wishlist Error:", err.response?.data || err.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${WISHLIST_API}/remove/${productId}`, { data: { userId } });
      setWishlist((prev) => prev.filter((c) => c.productId !== productId));
    } catch (err) {
      console.error("Remove Wishlist Error:", err.message);
    }
  };
  const clearCart = async () => {
  try {
    await axios.delete(`${CART_API}/clear`, { data: { userId } });
    setCart([]);
  } catch (err) {
    console.error("Clear Cart Error:", err.response?.data || err.message);
  }
};


  return (
    <CartContext.Provider
      value={{
        cart,
        
        wishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        clearCart,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
