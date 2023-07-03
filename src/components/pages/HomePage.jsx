import React, { useEffect } from 'react';
import SalesHits from '../SalesHits.jsx';
import Catalog from './Catalog.jsx';

import { useDispatch } from 'react-redux';
import { initialSearch } from '../../slices/search.js';
import { initialSearchInput } from '../../slices/searchInput.js';
import { addZero } from '../../slices/addMore.js';
import { searchBar } from '../../slices/searchBar.js';

export default function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchBar(false))
        dispatch(initialSearch());
        dispatch(initialSearchInput());
        dispatch(addZero());
    }, [dispatch]);

    return (
        <>
            <SalesHits />
            <Catalog />
        </>
    );
};
