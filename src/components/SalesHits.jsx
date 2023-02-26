import React, {useState, useEffect} from 'react';
import getItems from "../api/getItems.js";
import Item from "./Item";

export default function SalesHits() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getItems("http://localhost:7070/api/top-sales")
    .then(res => setData(res))
  }, []);

    return (
      <section className={data === [] ? "top-sales d-none" : "top-sales"}>
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
            {data.map((item) => <Item key={item.id} item={item} />)}
          </div>
      </section>
    );
};