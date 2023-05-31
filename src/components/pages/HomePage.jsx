import React from 'react';
import SalesHits from '../SalesHits.jsx';
import Catalog from './Catalog.jsx';

import { useDispatch } from 'react-redux';
import { search } from '../../slices/search.js';
import { searchInput } from '../../slices/searchInput.js';


export default function HomePage() {

    const dispatch = useDispatch();
    dispatch(searchInput(""));
    dispatch(search(undefined));

    return (
        <>
            <SalesHits />
            <Catalog />
        </>
    );
};
