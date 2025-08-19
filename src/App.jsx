import './home.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import ProductCard from "./Productcart";
import Kidscard from './Kidscard.jsx';
import StationCard from './Stationarycard.jsx';
import ToysCard from './ToysCard.jsx';
import Footer from "./Footer";
import ProductList from './Components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import AdminPage from './Components/Admin.jsx';
import AdminCategoryPage from './Components/AdminCategoryPage'; 
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import ContactsDetails from './Components/Contactdetails.jsx';
import ResetPasswordPage from './Components/ResetPasswordPage.jsx';
import AdminLoginForm from "./Components/AdminLoginform.jsx";
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { useCart } from "./Components/CartContext.jsx";
import WishlistPage from './Components/WishlistPage.jsx';
import CartPage from './Components/CartPage.jsx';
import BuyPage from "./Components/BuyPage.jsx";
import ForgotPassword from './Components/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPasswordPage.jsx';
import AdminOrdersPage from "./Components/AdminOrdersPage.jsx";
import BuyOnePage from './Components/BuyOnePage.jsx';
import UserLogin from './Components/userlogin.jsx';
import UserProducts from "./Components/userproducts.jsx";  // adjust path
import ChatBox from "./Components/ChatBox"; 
import AdminChatBox from "./Components/AdminChatBox";

function App() {
  const [products, setProducts] = useState([]);
  const [kidsproducts, kidssetProducts] = useState([]);
  const [Stationproducts, StationsetProducts] = useState([]);
  const [Toyproducts, ToysetProducts] = useState([]);
  const currentLocation = useLocation(); 

  const { cart, wishlist, addToCart, addToWishlist } = useCart();

  const cartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = (wishlist || []).length;

  useEffect(() => {
    axios.get("http://localhost:5000/api/home")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/kids") 
      .then(res => kidssetProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stationary")  
      .then(res => StationsetProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/toys")  
      .then(res => ToysetProducts(res.data))
      .catch(err => console.error(err));
  }, []);
useEffect(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);

  return (
    <div className="page-container">
      <Header cartCount={cartCount} wishlistCount={wishlistCount} />

      {currentLocation.pathname === "/" && (
        <div className="offer-banner">
          <marquee behavior="scroll" direction="left" scrollamount="8">
            🎉 Offer of the Day: 50% OFF on Below Products 🎉
          </marquee>
        </div>
      )}

      <div className="content-wrap">
        <Routes>

          <Route 
            path="/"
            element={
              <div className="product-grid container my-4">
                {products.length === 0 ? (
                  <p className="text-center mt-5">No products available</p>
                ) : (
                  products.map((product, index) => (
                    <ProductCard 
                      key={index} 
                      {...product} 
                      onAddToCart={() => addToCart(product)} 
                      onAddToWishlist={() => addToWishlist(product)} 
                    />
                  ))
                )}
              </div>
            }
          />

          <Route 
            path="/kidswear"
            element={
              <div className="product-grid container my-4">
                {kidsproducts.length === 0 ? (
                  <p className="text-center mt-5">No products available</p>
                ) : (
                  kidsproducts.map((product, index) => (
                    <Kidscard 
                      key={index} 
                      {...product} 
                      onAddToCart={() => addToCart(product)}
                      onAddToWishlist={() => addToWishlist(product)}
                    />
                  ))
                )}
              </div>
            }
          />

          <Route 
            path="/stationary"
            element={
              <div className="product-grid container my-4">
                {Stationproducts.length === 0 ? (
                  <p className="text-center mt-5">No products available</p>
                ) : (
                  Stationproducts.map((product, index) => (
                    <StationCard 
                      key={index} 
                      {...product} 
                      onAddToCart={() => addToCart(product)}
                      onAddToWishlist={() => addToWishlist(product)}
                    />
                  ))
                )}
              </div>
            }
          />

          <Route 
            path="/toys"
            element={
              <div className="product-grid container my-4">
                {Toyproducts.length === 0 ? (
                  <p className="text-center mt-5">No products available</p>
                ) : (
                  Toyproducts.map((product, index) => (
                    <ToysCard 
                      key={index} 
                      {...product} 
                      onAddToCart={() => addToCart(product)}
                      onAddToWishlist={() => addToWishlist(product)}
                    />
                  ))
                )}
              </div>
            }
          />

          <Route path="/products" element={<ProductList/>} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/home" element={<AdminCategoryPage category="Home" />} /> 
          <Route path="/admin/kids" element={<AdminCategoryPage category="Kids Wear" />} />
          <Route path="/admin/stationary" element={<AdminCategoryPage category="Stationary" />} />
          <Route path="/admin/toys" element={<AdminCategoryPage category="Toys" />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/admin/contacts" element={<ContactsDetails />} />
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:adminId" element={<ResetPasswordPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/buyone" element={<BuyOnePage />} />
          <Route path="/ulogin" element={<UserLogin />} />
<Route path="/userproducts/:email" element={<UserProducts />} />
 <Route path="/customer" element={<ChatBox />} />

        {/* Admin side */}
        <Route path="/admin" element={<AdminChatBox />} />


        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
