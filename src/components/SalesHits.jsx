import React from 'react';
import useFetchItems from '../hooks/useFetchItems.js';
import Item from "./Item.jsx";
import Loader from "./Loader.jsx";

export default function SalesHits() {

  const {data, loading, error} = useFetchItems();

  if (error) {
    return <p>Данные не загружены, пожалуйста, проверьте интернет подключение.</p>;
  };

  return (
    <>
    {(loading || data) && <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading && <Loader />}
        {data && <div className="row">
          {data.map((item) => <Item key={item.id} item={item} />)}
        </div>}
      </section>
    </>}
    </>
  );
};
