import React, { useState, useEffect } from 'react';
import Loader from './Loader.jsx';
import Item from './Item.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { items } from '../slices/items.js';
import { addMore } from '../slices/addMore.js';
import getItems from "../api/getItems.js";

export default function Items() {

  const [addMoreButton, setAddMoreButton] = useState(false);
  const [itemsAreLoading, setItemsAreLoading] = useState(true);
  const [itemsHaveError, setItemsHaveError] = useState(false);
  const [addItemsAreLoading, setAddItemsAreLoading] = useState(false);
  const [addItemsHaveError, setAddItemsHaveError] = useState(false);
  
  const dispatch = useDispatch();
  const filter = useSelector(state => state.category.value); 
  const itemsToRender = useSelector(state => state.items.value);
  const add = useSelector(state => state.addMore.value);
  const searchItems = useSelector(state => state.search.value); 

  useEffect(() => {
    let url;

    if (filter.id === 11) {
      url = searchItems === undefined ? "http://localhost:7070/api/items" : `http://localhost:7070/api/items?q=${searchItems}`;
    } else {
      url = searchItems === undefined ? `http://localhost:7070/api/items?categoryId=${filter.id}` : `http://localhost:7070/api/items?q=${searchItems}&categoryId=${filter.id}`;
    };

    function fetchItems() {
      setItemsHaveError(false);
      setItemsAreLoading(true);
      getItems(url)
      .then(result => {
        dispatch(items(result));
        (result.length < 6) ? setAddMoreButton(false) : setAddMoreButton(true);
        dispatch(addMore(6));
      })
      .catch(() => setItemsHaveError(true))
      .finally(() => setItemsAreLoading(false))
    };

    fetchItems();
  }, [filter, searchItems, dispatch]);

  const loadMore = () => {
    let urlForAdd;

    if (filter.id === 11) {
      urlForAdd = searchItems === undefined ? `http://localhost:7070/api/items?offset=${add}` : `http://localhost:7070/api/items?offset=${add}&q=${searchItems}`;
    } else {
      urlForAdd = searchItems === undefined ? `http://localhost:7070/api/items?categoryId=${filter.id}&offset=${add}` : `http://localhost:7070/api/items?categoryId=${filter.id}&offset=${add}&q=${searchItems}`;
    };

    function fetchAddItems() {
      setAddItemsHaveError(false);
      setAddItemsAreLoading(true);
      getItems(urlForAdd)
      .then(result => {
        dispatch(items([...itemsToRender, ...result]));
        (result.length < 6) ? setAddMoreButton(false) : setAddMoreButton(true);
        dispatch(addMore(add + 6)); 
      })
      .catch(() => setAddItemsHaveError(true))
      .finally(() => setAddItemsAreLoading(false))
    };

    fetchAddItems();
  };

  if (itemsHaveError) {
    return <p>Данные не загружены, пожалуйста, проверьте интернет-подключение.</p>;
  };

  return (
    <>
      {itemsAreLoading ? <Loader /> : <div>
        <div className="row">
          {itemsToRender?.map((item) => <Item key={item.id} item={item} />)}
        </div>
        {addItemsHaveError && <p>Данные не загружены, пожалуйста, проверьте интернет-подключение.</p>}
        {addItemsAreLoading ? <Loader /> : <div className="text-center">
          <button className={addMoreButton ? "btn btn-outline-primary" : "btn btn-outline-primary d-none"} onClick={() => loadMore()}>Загрузить ещё</button>
        </div>}
      </div>}
    </>
  );
};
