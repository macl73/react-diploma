import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './Search.jsx'

export default function Header() {

  const [isVisible, setIsVisible] = useState(false)
  const inCart = useSelector(state => state.order.value); 

  const handleClick = e => {
    if (isVisible) {
      if ("") {
        setIsVisible(false)
      } else {

      }
    } else {
      setIsVisible(true)
    }
  }

  const cartDisplay = () => {
    if (inCart.length === 0 ) {
      return null
    } else {
      return <div className="header-controls-cart-full">{inCart.length}</div>
    }
  }

  return (
    <header className="container">
      <div className="row">
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">
              <img src="img/header-logo.png" alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav new-navbar">
                <li className="nav-item">
                  <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contacts" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                <div data-id="search-expander" onClick={() => setIsVisible(!isVisible)} className="header-controls-pic header-controls-search"></div>
                <Search inHeader={true} visible={isVisible}/>
                  <NavLink to="/cart" className={({isActive}) => isActive ? "menu__item menu__item-active" : "menu__item"}>
                    <div className="header-controls-pic header-controls-cart">
                      {cartDisplay()}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </NavLink>
                </div>
                
              </div>
            </div>
        </nav>
      </div>
    </header>
  );
};
