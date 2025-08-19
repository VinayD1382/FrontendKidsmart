import React from "react";
import { useCart } from "./CartContext";
import "../home.css";

function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">♥ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div
              key={product.productId} 
              className="product-card card p-3 text-center shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top mb-2"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <h3 className="h5">{product.name}</h3>
              <p className="text-danger fw-bold">₹{product.price}</p>

              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => removeFromWishlist(product.productId)}
              >
                Remove
              </button>

              <div className="d-flex justify-content-center gap-2 mt-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    addToCart({
                      _id: product.productId,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                    })
                  }
                >
                  ADD TO CART
                </button >
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
