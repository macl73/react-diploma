import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import getItems from '../../api/getItems.js';
import { order } from '../../slices/order.js';
import Loader from '../Loader.jsx';

export default function Product() {

    const dispatch = useDispatch();
    let inCart = useSelector(state => state.order.value); 
    const navigate = useNavigate();
    const [product, setProduct] = useState(undefined);
    const {productId} = useParams();
    const [currentOrder, setCurrentOrder] = useState({
        id: productId,
        title: undefined,
        price: undefined,
        fullPrice: 0,
        size: undefined,
        count: 1
      });
    const [number, setNumber] = useState(1);
    const [productIsLoading, setProductIsLoading] = useState(true);
    const [productHasError, setProductHasError] = useState(false);

    useEffect(() => {
        setProductIsLoading(true);
        setProductHasError(false);
        getItems(`http://localhost:7070/api/items/${productId}`)
        .then(res => {
            setProduct(res);
            setCurrentOrder(prevData => ({
                ...prevData, 
                id: res?.id, 
                title: res?.title, 
                count: 1
            }));
        })
        .catch(() => setProductHasError(true))
        .finally(() => setProductIsLoading(false));
    }, [productId, dispatch]);

    const sizeChoose = (select) => {
        setCurrentOrder(prevData => ({...prevData, size: select}));
    };

    const decrement = () => {
        if (currentOrder.size) {
            if (number !== 1) {
                setNumber(number - 1);
                setCurrentOrder(prevData => ({...prevData, count: number - 1}));
            };
        };
    };

    const increment = () => {
        if (currentOrder.size) {
            if (number !== 10) {
                setNumber(number + 1);
                setCurrentOrder(prevData => ({...prevData, count: number + 1}));
            };
        };
    };

    const addToCart = (e) => {
        e.preventDefault();
        const existInCart = inCart.findIndex(item => item.id === currentOrder.id && item.size === currentOrder.size);
        let actualPrice, actualFullPrice, newCount;
        setProductIsLoading(true);
        setProductHasError(false);
        getItems(`http://localhost:7070/api/items/${productId}`)
        .then(res => {
            actualPrice = res.price;
        })
        .then(() => {
            if (existInCart !== -1) {
                newCount = inCart[existInCart].count + currentOrder.count;
                if (newCount > 10) { newCount = 10 };
                actualFullPrice = actualPrice * newCount;
            } else {
                actualFullPrice = actualPrice * currentOrder.count;
            };
        })
        .then(() => {
            existInCart !== -1 ? dispatch(order([...inCart.filter(item => (item.id + item.size) !== (currentOrder.id + currentOrder.size)), {...currentOrder, price: actualPrice, fullPrice: actualFullPrice, count: newCount}])) : dispatch(order([...inCart, {...currentOrder, price: actualPrice, fullPrice: actualFullPrice}]));
            existInCart !== -1 ? localStorage.setItem("cart", JSON.stringify([...inCart.filter(item => (item.id + item.size) !== (currentOrder.id + currentOrder.size)), {...currentOrder, price: actualPrice, fullPrice: actualFullPrice, count: newCount}])) : localStorage.setItem("cart", JSON.stringify([...inCart, {...currentOrder, price: actualPrice, fullPrice: actualFullPrice}]));
            navigate("/cart")})
        .catch(() => setProductHasError(true))
        .then(() => setProductIsLoading(false))
    };

    if (productHasError) {
        return <p>Продукт не загружен, пожалуйста, проверьте интернет-подключение.</p>;
    };

    return (
        <section className="catalog-item">
            {productIsLoading ? <Loader /> : <>
            <h2 className="text-center">{product?.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={product?.images[0]}
                        className="img-fluid" alt={product?.title} />
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{product?.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{product?.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{product?.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{product?.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{product?.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{product?.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <p>Размеры в наличии: {product.sizes.map(size => <span key={size.size} onClick={size.avalible ? () => sizeChoose(size.size) : null} className={currentOrder.size === size.size ? "catalog-item-size selected" : "catalog-item-size"}>{size.size}</span>)}</p>
                        <p className={currentOrder.size ? "" : "invisible"}>Количество: <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary" onClick={() => decrement()}>-</button>
                                <span className="btn btn-outline-primary">{number}</span>
                                <button className="btn btn-secondary" onClick={() => increment()}>+</button>
                            </span>
                        </p>
                    </div>
                    <button className={currentOrder.size ? "btn btn-danger btn-block btn-lg" : "btn btn-danger btn-block btn-lg d-none" } onClick={(e) => addToCart(e)}>В корзину</button>
                </div>
            </div></>}
        </section>
    );
};
