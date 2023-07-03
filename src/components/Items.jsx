import React, { useEffect } from 'react';
import Loader from './Loader.jsx';
import Item from './Item.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { items, addItems } from '../slices/items.js';
import { addMore, addZero } from '../slices/addMore.js';
import { addMoreButton } from '../slices/addMoreButton.js';
import { itemsLoader } from '../slices/itemsLoader.js';
import { itemsError } from '../slices/itemsError.js';
import { addItemsLoader } from '../slices/addItemsLoader.js'
import { addItemsError } from '../slices/addItemsError.js'
import getItems from "../api/getItems.js";

export default function Items() {
  
  const dispatch = useDispatch();
  const filter = useSelector(state => state.category.value); 
  const itemsToRender = useSelector(state => state.items.value);
  const add = useSelector(state => state.addMore.value);
  const searchItems = useSelector(state => state.search.value); 
  const addMoreButtonToggle = useSelector(state => state.addMoreButton.value);
  const itemsAreLoading = useSelector(state => state.itemsLoader.value);
  const itemsHaveError = useSelector(state => state.itemsError.value); 
  const addItemsAreLoading = useSelector(state => state.addItemsLoader.value);
  const addItemsHaveError = useSelector(state => state.addItemsError.value);

  useEffect(() => {

    dispatch(addZero());
    let url;

    if (filter.id === 11) {
      url = searchItems === undefined ? process.env.REACT_APP_API_URL + "/items" : process.env.REACT_APP_API_URL + `/items?q=${searchItems}`;
    } else {
      url = searchItems === undefined ? process.env.REACT_APP_API_URL + `/items?categoryId=${filter.id}` : process.env.REACT_APP_API_URL + `/items?q=${searchItems}&categoryId=${filter.id}`;
    };

    function fetchItems() {
      dispatch(itemsError(false));
      dispatch(itemsLoader(true));
      getItems(url)
      .then(result => {
        dispatch(items(result));
        (result.length < 6) ? dispatch(addMoreButton(false)) : dispatch(addMoreButton(true));
        dispatch(addMore());
      })
      .catch(() => dispatch(itemsError(true)))
      .finally(() => dispatch(itemsLoader(false)))
    };

    fetchItems();
  }, [filter, searchItems, dispatch]);

  const loadMore = () => {
    let urlForAdd;

    if (filter.id === 11) {
      urlForAdd = searchItems === undefined ? process.env.REACT_APP_API_URL + `/items?offset=${add}` : process.env.REACT_APP_API_URL + `/items?offset=${add}&q=${searchItems}`;
    } else {
      urlForAdd = searchItems === undefined ? process.env.REACT_APP_API_URL + `/items?categoryId=${filter.id}&offset=${add}` : process.env.REACT_APP_API_URL + `/items?categoryId=${filter.id}&offset=${add}&q=${searchItems}`;
    };

    function fetchAddItems() {
      dispatch(addItemsError(false));
      dispatch(addItemsLoader(true));
      getItems(urlForAdd)
      .then(result => {
        dispatch(addItems(result));
        (result.length < 6) ? dispatch(addMoreButton(false)) : dispatch(addMoreButton(true));
        dispatch(addMore()); 
      })
      .catch(() => dispatch(addItemsError(true)))
      .finally(() => dispatch(addItemsLoader(false)))
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
          <button className={addMoreButtonToggle ? "btn btn-outline-primary" : "btn btn-outline-primary d-none"} onClick={() => loadMore()}>Загрузить ещё</button>
        </div>}
      </div>}
    </>
  );
};
