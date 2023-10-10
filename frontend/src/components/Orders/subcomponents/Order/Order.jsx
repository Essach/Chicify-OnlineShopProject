import './Order.scss';

import truckIcon from '../../../../icons/orderTruck.svg';
import boxIcon from '../../../../icons/orderBox.svg';

import request from '../../../../helpers/request';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const Order = ({id, status, setOrderId, openOrderPage}) => {
    const [productInfo, setProductInfo] = useState({
        id: '',
        name: '',
        price: 0,
        delivery: [],
        quantity: 0,
        images: [],
        description: '',
        categories: [],
        reviews: [],
    });

    let orderHeader;
    if (status === 'inDelivery') {
        orderHeader = (
            <>
                <img src={truckIcon} alt='truck icon' />
                <p>In delivery...</p>
            </>
        )
    } else if (status === 'delivered') {
        orderHeader = (
            <>
                <img src={boxIcon} alt='box icon' />
                <p>Your order is ready to collect</p>
            </>
        )
    }

    const fetchData = async (id) => {
        const { data } = await request.get(`/products/${id}`);
        setProductInfo(data.product);
    }

    const handleSeeMoreDetails = () => {
        setOrderId()
        openOrderPage()
    }

    useEffect(() => {
        fetchData(id);
    }, [id])

    return (
        <order-item>
            <order-header>
                {orderHeader}
            </order-header>
            <order-content>
                <inner-box>
                    <order-image>
                        <img src={productInfo.images[0]} alt={productInfo.name}/>
                    </order-image>
                    <order-info>
                        <product-name>
                            {productInfo.name}
                        </product-name>
                        <product-reviews>
                            
                        </product-reviews>
                    </order-info>
                </inner-box>
                <product-price>
                    {`US$ ${productInfo.price}`}
                </product-price>
            </order-content>
            <order-footer onClick={handleSeeMoreDetails}>
                See more details
            </order-footer>
        </order-item>
    );
}

Order.propTypes = {
    id: PropTypes.string,
    status: PropTypes.string,
    setOrderId: PropTypes.func,
    openOrderPage: PropTypes.func,
}

export default Order;