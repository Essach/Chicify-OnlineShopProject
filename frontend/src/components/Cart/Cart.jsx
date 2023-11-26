/* eslint-disable react-hooks/exhaustive-deps */
import './Cart.scss';

import cartIcon from '../../icons/cartBig.svg';

import CartProducts from './CartProducts/CartProducts';
import CartForm from './CartForm/CartForm';

import { useContext, useEffect, useState } from 'react';

import request from '../../helpers/request';

import { getCartSaved } from '../../helpers/localStorage';

import { CartContext } from '../../context/CartContext';
import { StoreContext } from '../../store/StoreProvider';

const Cart = () => {

    const cartSaved = getCartSaved();

    const { languageMode } = useContext(StoreContext);

    const { state } = useContext(CartContext)

    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [delivery, setDelivery] = useState({
        standardPrice: 0,
        expressPrice: 0,
    });

    const fetchData = async () => {
        if (cartSaved.cart.length > 0) {
            let arr = []

            for (let i = 0; i < cartSaved.cart.length; i++) {
                const { data, status } = await (request.get(`/products/${cartSaved.cart[i].id}`));
                if (status === 200) {
                    let newProduct = data.product;
                    newProduct.currentQuantity = cartSaved.cart[i].quantity;
                    arr.push(newProduct);
                }
            }
            setProducts(arr);
        } else if (cartSaved.cart.length === 0 && products.length !== 0){
            setProducts([])
        }
    }

    useEffect(() => {
        fetchData()
    }, [state.cart])

    useEffect(() => {
        if (products.length > 0) {
            setPrice(products.map(product => product.price * product.currentQuantity).reduce((a, b) => a + b));

            const delivery = products.map(product => product.delivery)
            let deliveryStandard = [];
            let deliveryExpress = [];
            for (let i = 0; i < delivery.length; i++) {
                for (let j = 0; j < delivery[i].length; j++) {
                    if (delivery[i][j].type === 'Standard') {
                        deliveryStandard.push(delivery[i][j].price)
                    } else if (delivery[i][j].type === 'Express') {
                        deliveryExpress.push(delivery[i][j].price)
                    }
                }
            }
            let isDeliveryStandard = true
            let isDeliveryExpress = true
            for (let i = 0; i < products.length; i++) {
                if (!products[i].delivery.map(delivery => delivery.type).includes("Standard")) isDeliveryStandard = false;
            }
            for (let i = 0; i < products.length; i++) {
                if (!products[i].delivery.map(delivery => delivery.type).includes("Express")) isDeliveryExpress = false;
            }

            let standardPrice = 0;
            if (isDeliveryStandard) {
                for (let i = 0; i < products.length; i++) {
                    standardPrice = standardPrice + products[i].delivery.filter(delivery => delivery.type === "Standard")[0].price;
                }
            }
            let expressPrice = 0;
            if (isDeliveryExpress) {
                for (let i = 0; i < products.length; i++) {
                    expressPrice = expressPrice + products[i].delivery.filter(delivery => delivery.type === "Express")[0].price;
                }
            }
            
            setDelivery({
                standardPrice: standardPrice,
                expressPrice: expressPrice,
            })
        }
    },[products]);

    return (
        <cart-container>
            <cart-title>
                    <img src={cartIcon} alt='cart icon' />
                <p>{languageMode === 'en' ? 'Cart' : 'Koszyk'}</p>
            </cart-title>
            <container-bottom>
                <CartProducts products={products} />
                <CartForm price={price} delivery={delivery} />
            </container-bottom>
        </cart-container>
    );
}

export default Cart;