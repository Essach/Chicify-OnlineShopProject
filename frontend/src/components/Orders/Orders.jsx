import './Orders.scss';

import { StoreContext } from '../../store/StoreProvider';

import { useContext, useEffect, useState } from 'react';

import ordersIcon from '../../icons/ordersPage.svg';

import Order from './subcomponents/Order/Order';
import OrderPage from './subcomponents/OrderPage/OrderPage';

import request from '../../helpers/request';

const Orders = () => {
    const { user } = useContext(StoreContext)

    const [orders, setOrders] = useState([]);

    const [isDetailsPageOpen, setIsDetailsPageOpen] = useState(false);
    
    const [orderId, setOrderId] = useState(undefined);

    // const setMoreDetails = async (paymentId) => {
    //     const { status, data } = await (request.get(`/payments/${paymentId}`));
    //     if (status === 200) {
    //         setOrderPageDetails(data);
    //     } else if (status === 500) {
    //         throw new Error(data.error);
    //     } else {
    //         throw new Error(data.message);
    //     }
    // }

    const openOrderPage = () => setIsDetailsPageOpen(true);
    const closeOrderPage = () => {
        setIsDetailsPageOpen(false);
        setOrderPageDetails([])
    }

    useEffect(() => {
        if (user !== null && user !== undefined) {
            const orders = user.orders.map(item => item.products.map(order => <Order key={order.id} id={order.id} status={order.status} setOrderId={() => { setOrderId(item.paymentId) }} openOrderPage={openOrderPage} />));
            setOrders(orders)
        }
    },[user])

    return (
        <>
            {user === null || user === undefined ?
            <login-request>
                <p>Please login to see your orders</p>
                <login-btn>Login</login-btn>
            </login-request> :
            <>
                    {isDetailsPageOpen ? <OrderPage id={orderId} closeOrderPage={closeOrderPage} /> :
            <orders-page>
                <orders-title>
                    <img src={ordersIcon} alt='orders icon' />
                    <p>Your orders:</p>
                </orders-title>
                    {user.orders.length > 0 ?
                        <orders-items>
                            {orders}
                        </orders-items> : 
                        <no-orders>
                            {`You don't have any orders`}
                        </no-orders>
                        }
            </orders-page>
            }
            </>
            }
        </>
    );
}

export default Orders;