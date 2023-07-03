import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { search } from '../slices/search.js';
import { searchInput } from '../slices/searchInput.js';
import { searchBar } from '../slices/searchBar.js';

export default function Search({inHeader}) {

    const searchInputItem = useSelector(state => state.searchInput.value);
    const isVisible = useSelector(state => state.searchBar.value); 
    const route = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => {
        dispatch(searchInput(e.target.value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(search(searchInputItem));
        navigate("/catalog");
    };

    const handleClick = () => {
        if (isVisible) {
            const searchInput = document.querySelector(".form-control");
            if (searchInput.value.length === 0) {
                dispatch(search(searchInputItem));
                dispatch(searchBar(false))
            } else {
                dispatch(search(searchInputItem));
                navigate("/catalog");
            };
        } else {
            dispatch(searchBar(true))
        };
    };

    const classSelector = (isVisible) => {
        return isVisible ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible";
    };

    const renderSearch = (location) => {
        if (location) {
            return (
                <>
                    <div data-id="search-expander" onClick={() => handleClick()} className="header-controls-pic header-controls-search"></div>
                    <form data-id="search-form" onSubmit={e => handleSubmit(e)} className={classSelector(isVisible)}>
                        <input type="text" className="form-control" onChange={e => handleChange(e)} placeholder="Поиск" value={searchInputItem} />
                    </form>
                </>
            );
        } else if (route.pathname === "/catalog" && !location) {
            return (
                <>
                    <form data-id="search-form" onSubmit={e => handleSubmit(e)} className="catalog-search-form form-inline">
                        <input type="text" className="form-control" onChange={e => handleChange(e)} placeholder="Поиск" value={searchInputItem} />
                    </form>
                </> 
            );
        } else {
            return;
        };
    };

    return (
        renderSearch(inHeader)
    );
};
