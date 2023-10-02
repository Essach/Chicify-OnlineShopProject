import './Order.scss';

import truckIcon from '../../../../icons/orderTruck.svg';
import boxIcon from '../../../../icons/orderBpx.svg';

import request from '../../../../helpers/request';
import { useEffect, useState } from 'react';

const Order = ({id, status}) => {
    const [productInfo, setProductInfo] = useState();

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

    const fetchData = async () => {
        const { product } = await request.get(`/products/:${id}`);
        setProductInfo(product);
    }

    useEffect(() => {
        fetchData();
    })

    return (
        <order-item>
            <order-header>
                {orderHeader}
            </order-header>
            <order-content>
                <inner-box>
                    <order-image>

                    </order-image>
                    <order-info>
                        <product-name>

                        </product-name>
                        <product-reviews>
                            
                        </product-reviews>
                    </order-info>
                </inner-box>
                <product-price>

                </product-price>
            </order-content>
        </order-item>
    );
}

export default Order;