import React, { useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { eraseOrder, deleteFromOrder } from '../../slices/order.js';
import sendOrder from '../../api/sendOrder.js';

export default function Cart() {

  const dispatch = useDispatch();
  const inCart = useSelector(state => state.order.value);
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    phone: "",
    address: ""
  });
  const [checked, setChecked] = useState(false);
  const total = inCart.reduce((sum, item) => sum + item.fullPrice, 0);

  const handleChange = e => {
    const {name, value} = e.target;
    setClientData(prevData => ({...prevData, [name]: String(value)}));
  };

  const handleDelete = (out) => {
    localStorage.setItem("cart", JSON.stringify(inCart.filter(item => item !== out)));
    dispatch(deleteFromOrder(out));
  };

  const acceptOrder = e => {
    e.preventDefault();
    if(inCart.length !== 0 && clientData.phone !== "" && clientData.address !== "" && checked !== false) {
      const cart = [];
      inCart.forEach(item => cart.push({id: item.id, price: item.price, count: item.count}));
      const data = {
        owner: clientData,
        items: cart
      };

      sendOrder(data);
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch(eraseOrder());
      e.target.closest("form").reset();
      alert("Поздравляем! Вы успешно оформили заказ, осталось только оплатить!");
      navigate("/");
    } else {
      alert("К сожалению, некоторые данные некорректны...");
    };
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {inCart?.map((item, index) => 
            <tr key={item.id + item.size}>
              <td >{index + 1}</td>
              <td><NavLink to={`/catalog/${item.id}`}>{item.title}</NavLink></td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>{item.price} руб.</td>
              <td>{item.fullPrice} руб.</td>
              <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item)}>Удалить</button></td>
            </tr>)}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{total} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{maxWidth: "30rem", margin: "0 auto"}}>
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" onChange={e => handleChange(e)} id="phone" name="phone" placeholder="Ваш телефон" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" onChange={e => handleChange(e)} id="address" name="address" placeholder="Адрес доставки" required />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" onChange={() => setChecked(!checked)} name="agreed" id="agreement" />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit"  onClick={(e) => acceptOrder(e)} className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      </section>
    </>
  );
};
