import React, { useEffect, useState } from "react";
import axios from "axios";
import '../home.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/home")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (product) => {
    console.log("Added to cart:", product);
  };

  const handleBuy = (product) => {
    console.log("Buying product:", product);
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p>{product.description}</p>

              <div className="button-group">
                <button className="btn-add" onClick={() => handleAdd(product)}>Add</button>
                <button className="btn-buy" onClick={() => handleBuy(product)}>Buy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;

