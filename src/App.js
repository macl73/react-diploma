import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './components/HomePage.jsx'
import Catalog from './components/Catalog.jsx'
import About from './components/About.jsx'
import Contacts from './components/Contacts.jsx'
import Cart from './components/Cart.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

function App() {
  return (
    <>
      <Header />
      <>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </>
      <Footer />
    </>
  );
}

export default App;
/* */