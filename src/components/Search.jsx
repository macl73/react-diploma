import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { items } from '../slices/items.js';
import { search } from '../slices/search.js';
import getItems from "../api/getItems.js";

export default function Search({inHeader, visible}) {

    const searchItems = useSelector(state => state.search.value); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [word, setWord] = useState()

    const handleChange = e => {
        setWord(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(search(word))
        navigate("/catalog");        
        getItems(`http://localhost:7070/api/items?q=${searchItems}`)
        .then(res => dispatch(items(res)));
    }

    const classSelector = (inHeader, visible) => {
        if (inHeader) {
            return visible ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible"
        } else {
            return location.pathname === '/' ? "catalog-search-form form-inline d-none" : "catalog-search-form form-inline"
        }
    }

    return (
        <form data-id="search-form" onSubmit={e => handleSubmit(e)} className={classSelector(inHeader, visible)}>
            <input className="form-control" onChange={e => handleChange(e)} placeholder="Поиск" value={searchItems} />
        </form>
        );
    };
