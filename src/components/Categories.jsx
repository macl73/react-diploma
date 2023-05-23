import React from 'react';
import useFetchCats from '../hooks/useFetchCats.js';
import Loader from './Loader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { category } from '../slices/category.js';

export default function Categories() {

    const dispatch = useDispatch();
    const filter = useSelector(state => state.category.value); 
    const {data, loading, error} = useFetchCats();

    if (error) {
        return <p>Категории не загружены, пожалуйста, проверьте интернет-подключение.</p>;
    };

    const handleClick = (e, cat) => {
        e.preventDefault();
        dispatch(category(cat));
    };

    return (
        <>
        {loading ? <Loader /> : <ul className="catalog-categories nav justify-content-center">
            {data?.map((cat) => <li key={cat.id} className="nav-item">
                <a className={cat.title === filter.title ? "nav-link active" : "nav-link"} href={cat.id} onClick={(e) => handleClick(e, cat)}>{cat.title}</a>
            </li>)}
        </ul>}
        </>
    );
};
