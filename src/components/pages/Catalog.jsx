import React from 'react';
import getItems from "../../api/getItems.js";
import Item from "../Item";
import Search from '../Search.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { category } from '../../slices/category.js';
import { items } from '../../slices/items.js';
import { addMore } from '../../slices/addMore.js';

export default function Catalog() {

  const dispatch = useDispatch();
  const filter = useSelector(state => state.category.value); 
  const itemsToRender = useSelector(state => state.items.value); 
  const categories = useSelector(state => state.categories.value);
  const add = useSelector(state => state.addMore.value);
  const searchItems = useSelector(state => state.search.value); 

  const handleClick = (e, cat) => {
    e.preventDefault()
    dispatch(category(cat))
  }

  const loadMore = () => {
    if (filter.id === 11) {
      getItems(searchItems === undefined ? `http://localhost:7070/api/items?offset=${add}` : `http://localhost:7070/api/items?offset=${add}&q=${searchItems}`)
      .then(res => dispatch(items([...itemsToRender, ...res])));
    } else {
      getItems(searchItems === undefined ? `http://localhost:7070/api/items?categoryId=${filter.id}&offset=${add}` : `http://localhost:7070/api/items?categoryId=${filter.id}&offset=${add}&q=${searchItems}`)
      .then(res => dispatch(items([...itemsToRender, ...res])));
    }
    dispatch(addMore(add + 6))
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <Search inHeader={false}/>
      <ul className="catalog-categories nav justify-content-center">
        {categories.map((cat) => <li key={cat.id} className="nav-item">
          <a className={cat.title === filter.title ? "nav-link active" : "nav-link"} href="Not works!" onClick={(e) => handleClick(e, cat)}>{cat.title}</a>
        </li>)}
      </ul>
      <div className="row">
        {itemsToRender.map((item) => <Item key={item.id} item={item} />)}
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary load-more" onClick={() => loadMore()}>Загрузить ещё</button>
      </div>
    </section>
  );
};
