import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { items } from '../slices/items.js';
import { search } from '../slices/search.js';
import { searchInput } from '../slices/searchInput.js';
import getItems from "../api/getItems.js";

export default function Search({inHeader}) {

    const searchItem = useSelector(state => state.search.value); 
    const searchInputItem = useSelector(state => state.searchInput.value); 
    const route = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const [word, setWord] = useState("")
    const [isVisible, setIsVisible] = useState(false)



    const handleChange = e => {
        //setWord(e.target.value)
    dispatch(searchInput(e.target.value))
    }

    const handleSubmit = e => {
        e.preventDefault()
        //dispatch(search(word))
    dispatch(search(searchInputItem))
        navigate("/catalog");        
        getItems(`http://localhost:7070/api/items?q=${searchItem}`)
        .then(res => dispatch(items(res)));
    }

    const handleClick = () => {
        if (isVisible) {
            const searchInput = document.querySelector(".form-control")
          if (searchInput.value.length === 0) {
            setIsVisible(false)
          } else {
            //dispatch(search(word))
        dispatch(search(searchInputItem))
            navigate("/catalog");        
            getItems(`http://localhost:7070/api/items?q=${searchItem}`)
            .then(res => dispatch(items(res)));
          }
        } else {
          setIsVisible(true)
        }
    }

    const classSelector = (isVisible) => {
        return isVisible ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible"
    }

    const renderSearch = (location) => {
        if (location) {
            return (
                <>
                    <div data-id="search-expander" onClick={() => handleClick()} className="header-controls-pic header-controls-search"></div>
                    <form data-id="search-form" onSubmit={e => handleSubmit(e)} className={classSelector(isVisible)}>
                        <input type="text" className="form-control" onChange={e => handleChange(e)} placeholder="Поиск" value={searchInputItem} />
                    </form>
                </>
            )
        } else if (route.pathname === "/catalog" && !location) {
            return (
                <>
                    <form data-id="search-form" onSubmit={e => handleSubmit(e)} className="catalog-search-form form-inline">
                        <input type="text" className="form-control" onChange={e => handleChange(e)} placeholder="Поиск" value={searchInputItem} />
                    </form>
                </> 
            )
        } else {
            return
        }
    }

    return (
        renderSearch(inHeader)
    );
};
