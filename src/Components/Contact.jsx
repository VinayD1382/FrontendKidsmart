import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("https://backendkidsmart.onrender.com/api/contact", formData);

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" }); // Reset form
  } catch (err) {
    console.error("Failed to submit contact form", err);
    alert("Failed to send your message. Please try again.");
  }
};

  return (
    <div className="container my-5 text-light" style={{ width: "800px", height: "500px" }
}>
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-4">
          <div className="bg-dark p-4 rounded shadow">
            {submitted && (
              <div className="alert alert-success text-center">
                ✅ Your message has been sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-light">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-warning w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
