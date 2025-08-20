import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminCategoryPage({ category }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
const [formData, setFormData] = useState({ name: "", price: "", description: "" });


  const getEndpoint = (cat) => {
    switch (cat) {
      case "Home":
        return "home";
      case "Kids Wear": 
         return "kids";
      case "Stationary":
        return "stationary";
      case "Toys":
        return "toys";
      default:
        return "home";
    }
  };

  const fetchProducts = async () => {
    try {
      const endpoint = getEndpoint(category);
      const res = await axios.get(`https://backendkidsmart.onrender.com/api/${endpoint}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const endpoint = getEndpoint(category); 
      await axios.delete(`https://backendkidsmart.onrender.com/api/${endpoint}/${id}`);
      alert(`${category} product deleted successfully!`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };
const handleUpdate = async (id) => {
  try {
    const endpoint = getEndpoint(category);
    await axios.put(`https://backendkidsmart.onrender.com/api/${endpoint}/${id}`, formData);
    alert("Product updated successfully!");
    setEditingProduct(null);
    fetchProducts();
  } catch (err) {
    console.error(err);
    alert("Failed to update product");
  }
};


  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (

    <div className="container my-4">
      <h2 className="text-center mb-4">Manage {category} Products</h2>

      {products.length === 0 ? (
        <p className="text-center mt-5">No products available</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {products.map((product) => (
            <div key={product._id} className="col mb-4">
              <div className="card p-3 shadow">
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="img-fluid mb-3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <h5>{product.name}</h5>
                <p>Price: ₹{product.price}</p>
                <p>{product.description}</p>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setEditingProduct(product._id);
                      setFormData({
                        name: product.name,
                        price: product.price,
                        description: product.description
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>

                {editingProduct === product._id && (
                  <div className="mt-3">
                    <input
                      className="form-control mb-2"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                    <textarea
                      className="form-control mb-2"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCategoryPage;
