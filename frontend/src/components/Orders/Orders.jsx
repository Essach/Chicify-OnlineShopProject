import './Orders.scss';

import { StoreContext } from '../../store/StoreProvider';

import { useContext, useEffect, useState } from 'react';

import ordersIcon from '../../icons/ordersPage.svg';

import Order from './subcomponents/Order/Order';
import OrderPage from './subcomponents/OrderPage/OrderPage';
import Login from '../Login/Login';

const Orders = () => {
    const { user, languageMode } = useContext(StoreContext)

    const [orders, setOrders] = useState([]);

    const [isDetailsPageOpen, setIsDetailsPageOpen] = useState(false);
    
    const [orderId, setOrderId] = useState(undefined);
    const [productId, setProductId] = useState(undefined);

    const setIds = (paymentId, productId) => {
        setOrderId(paymentId);
        setProductId(productId)
    }

    const openOrderPage = () => setIsDetailsPageOpen(true);
    const closeOrderPage = () => {
        setIsDetailsPageOpen(false);
        setProductId()
        setOrderId()
    }

    useEffect(() => {
        
        if (user !== null && user !== undefined) {
            const orders = user.orders.slice().reverse().map(item => item.products.map(order => <Order key={order.id} id={order.id} status={order.status} setOrderId={()=>{setIds(item.paymentId, order.id)}} openOrderPage={openOrderPage} />));
            setOrders(orders)
        }
    }, [user])
    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenLogin = () => setIsModalOpen(true);
    const handleOnCloseLogin = () => setIsModalOpen(false);

    return (
        <>
            {user === null || user === undefined ?
            <login-request>
                <p>{languageMode === 'en' ? 'Please login to see your orders' : 'Zaloguj się, aby zobaczyć swoje zamówienia'}</p>
                <login-btn onClick={handleOpenLogin}>{languageMode === 'en' ? 'Login' : 'Zaloguj się'}</login-btn>
                <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpen} />
            </login-request> :
            <>
            {isDetailsPageOpen ? <OrderPage productId={productId} paymentId={orderId} closeOrderPage={closeOrderPage} /> :
            <orders-page>
                <orders-title>
                    <img src={ordersIcon} alt='orders icon' />
                    <p>{languageMode === 'en' ? 'Your orders:' : 'Twoje zamówienia:'}</p>
                </orders-title>
                    {user.orders.length > 0 ?
                        <orders-items>
                            {orders}
                        </orders-items> : 
                        <no-orders>
                            {languageMode === 'en' ? `You don't have any orders` : 'Nie masz żadnych zamówień'}
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