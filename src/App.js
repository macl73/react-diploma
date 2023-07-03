import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { savedOrder } from './slices/order.js';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Catalog from './components/pages/Catalog.jsx';
import About from './components/pages/About.jsx';
import Contacts from './components/pages/Contacts.jsx';
import Cart from './components/pages/Cart.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import Product from './components/pages/Product.jsx';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.cart !== undefined) {
      dispatch(savedOrder());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/catalog/:productId" element={<Product />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
