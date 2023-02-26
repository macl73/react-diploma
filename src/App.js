import React, { useEffect } from 'react';
import getCategories from "./api/getCategories.js";
import getItems from "./api/getItems.js";
import { useDispatch, useSelector } from 'react-redux';
import { items } from './slices/items.js';
import { categories } from './slices/categories.js';
import { addMore } from './slices/addMore.js';
import { order } from './slices/order.js';

import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './components/pages/HomePage.jsx'
import Catalog from './components/pages/Catalog.jsx'
import About from './components/pages/About.jsx'
import Contacts from './components/pages/Contacts.jsx'
import Cart from './components/pages/Cart.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'
import Product from './components/pages/Product.jsx'

function App() {

  const dispatch = useDispatch();
  const filter = useSelector(state => state.category.value);
  const searchItems = useSelector(state => state.search.value); 

  useEffect(() => {
    if (localStorage.cart !== []) {
      dispatch(order(JSON.parse(localStorage.cart)))
    }
  }, [dispatch]);
  
  useEffect(() => {
    getItems("http://localhost:7070/api/items")
      .then(res => dispatch(items(res)));
  }, [dispatch]);

  useEffect(() => {
    getCategories("http://localhost:7070/api/categories")
      .then(arr => dispatch(categories([{id: 11, title: "Все"}, ...arr])))
  }, [dispatch]);

  useEffect(() => {
    if (filter.id === 11) {
      getItems(searchItems === undefined ? "http://localhost:7070/api/items" : `http://localhost:7070/api/items?q=${searchItems}`, "GET")
    .then(res => dispatch(items(res)));
    } else {
      getItems(searchItems === undefined ? `http://localhost:7070/api/items?categoryId=${filter.id}` : `http://localhost:7070/api/items?q=${searchItems}&categoryId=${filter.id}`, "GET")
    .then(res => dispatch(items(res)));
    }
    dispatch(addMore(6))
  }, [filter, searchItems, dispatch])

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
}

export default App;
