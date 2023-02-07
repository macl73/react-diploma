import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Header() {
    return (
      <header className="container">
        <div className="row">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <NavLink to="/" className="navbar-brand">
                <img src="img/header-logo.png" alt="Bosa Noga" />
              </NavLink>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
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
                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                    <NavLink to="/cart" className={({isActive}) => isActive ? "menu__item menu__item-active" : "menu__item"}>
                      <div className="header-controls-pic header-controls-cart">
                        <div className="header-controls-cart-full">1</div>
                        <div className="header-controls-cart-menu"></div>
                      </div>
                    </NavLink>
                  </div>
                  <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                    <input className="form-control" placeholder="Поиск" />
                  </form>
                </div>
              </div>
          </nav>
        </div>
      </header>
    );
};