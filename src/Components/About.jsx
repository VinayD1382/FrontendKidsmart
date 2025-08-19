import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  return (
    <div className="container my-5 p-4 rounded shadow"
         style={{ backgroundColor: "#0e0e0eff",marginTop:"0px" }}> 
      
      <h1 className="text-center mb-4 text-light">About KidsMart</h1>
      
      <p className="lead text-center mb-5 text-light">
        Welcome to <strong>KidsMart</strong>! 🎉  
        Your one-stop shop for Kids Wear, Toys, and Stationery.
      </p>

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
            alt="Kids Wear"
            className="img-fluid mb-3"
            style={{ width: "80px" }}
          />
          <h4 className="text-light">Quality Kids Wear</h4>
          <p className="text-light">
            We offer the best quality clothes for kids, ensuring comfort and safety.
          </p>
        </div>

        <div className="col-md-4 mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3659/3659898.png"
            alt="Toys"
            className="img-fluid mb-3"
            style={{ width: "80px" }}
          />
          <h4 className="text-light">Fun Toys</h4>
          <p className="text-light">
            A wide variety of safe and fun toys that kids will love to play with.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Stationery"
            className="img-fluid mb-3"
            style={{ width: "80px" }}
          />
          <h4 className="text-light">Creative Stationery</h4>
          <p className="text-light">
            From pencils to art supplies, we provide everything for your kids' creativity.
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <h5 className="text-light">📞 Contact Us:</h5>
        <p className="text-light" style={{color:"white"}}>
          Email: support@kidsmart.com | Phone: +91 88846 81382
        </p>
      </div>
    </div>
  );
}

export default About;
