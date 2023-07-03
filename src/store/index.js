import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/category.js';
import itemsReducer from '../slices/items.js';
import searchReducer from '../slices/search.js';
import addMoreReducer from '../slices/addMore.js';
import orderReducer from '../slices/order.js';
import searchInputReducer from '../slices/searchInput.js';
import searchBarReducer from '../slices/searchBar.js';
import addMoreButtonReducer from '../slices/addMoreButton.js';
import itemsLoaderReducer from '../slices/itemsLoader.js';
import itemsErrorReducer from '../slices/itemsError.js';
import addItemsLoaderReducer from '../slices/addItemsLoader.js';
import addItemsErrorReducer from '../slices/addItemsError.js';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    items: itemsReducer,
    search: searchReducer,
    addMore: addMoreReducer,
    order: orderReducer,
    searchInput: searchInputReducer,
    searchBar: searchBarReducer,
    addMoreButton: addMoreButtonReducer,
    itemsLoader: itemsLoaderReducer,
    itemsError: itemsErrorReducer,
    addItemsLoader: addItemsLoaderReducer,
    addItemsError: addItemsErrorReducer,
  },
});

export default store;
