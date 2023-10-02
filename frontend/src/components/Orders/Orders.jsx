import './Orders.scss';

import { StoreContext } from '../../store/StoreProvider';

import { useContext, useEffect, useState } from 'react';

import ordersIcon from '../../icons/ordersPage.svg';

const Orders = () => {
    const { user } = useContext(StoreContext)

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user !== null && user !== undefined) {
            console.log(user.orders)
        }
    },[user])

    return (
        <>
            {user === null || user === undefined ?
            <login-request>
                <p>Please login to see your orders</p>
                <login-btn>Login</login-btn>
            </login-request> :
            <orders-page>
                <orders-title>
                    <img src={ordersIcon} alt='orders icon' />
                    <p>Your orders:</p>
                </orders-title>

            </orders-page>
            }
        </>
    );
}

export default Orders;