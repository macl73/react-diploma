import React from 'react';
import Categories from "../Categories.jsx";
import Search from '../Search.jsx';
import Items from '../Items.jsx';

export default function Catalog() {

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <Search inHeader={false}/>
      <Categories />
      <Items />
    </section>
  );
};
