import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/category.js';
import itemsReducer from '../slices/items.js';
import searchReducer from '../slices/search.js';
import addMoreReducer from '../slices/addMore.js';
import orderReducer from '../slices/order.js';
import searchInputReducer from '../slices/searchInput.js';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    items: itemsReducer,
    search: searchReducer,
    addMore: addMoreReducer,
    order: orderReducer,
    searchInput: searchInputReducer,
  },
});

export default store;
