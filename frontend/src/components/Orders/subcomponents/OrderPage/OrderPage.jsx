import { useEffect, useState } from 'react';
import './OrderPage.scss';

import { PropTypes } from 'prop-types';

import request from '../../../../helpers/request';

import close from '../../../../icons/close.svg';

import Order from '../Order/Order';

const OrderPage = ({ id, closeOrderPage }) => {

    const [details, setDetails] = useState()
    console.log(details)

    const setMoreDetails = async (paymentId) => {
        const { status, data } = await request.get(`/payments/${paymentId}`);

        if (status === 200) {
            setDetails(data);
        } else if (status === 500) {
            throw new Error(data.error);
        } else {
            throw new Error(data.message);
        }
    }

    useEffect(() => {
        setMoreDetails(id)
    },[id])

    return (
        <order-page>
            <close-btn>
                <img src={close} alt='go back' />
            </close-btn>
            <inner-box>
                <box-title>
                    More order details
                </box-title>
                <product-item>
                    <order-image>
                        <img src={} alt={}/>
                    </order-image>
                    <order-info>
                        <product-name>
                            
                        </product-name>
                        <product-reviews>
                            
                        </product-reviews>
                    </order-info>
                </product-item>
                <order-info>
                    <info-price>
                        <p>Product price:</p>
                        <p>Total order price:</p>
                    </info-price>
                    <info-delivery>
                        <p>Delivery status:</p>
                    </info-delivery>
                    <info-address>
                        <p>Delivery address:</p>
                        <p>Recipient name:</p>
                    </info-address>
                    <info-card>
                        <p className='title'>Card info:</p>
                        <p className='sub'>Card number:</p>
                        <p className='sub'>Expiry date:</p>
                        <p className='sub'>CVV number:</p>
                    </info-card>
                </order-info>
            </inner-box>
        </order-page>
    );
}

OrderPage.propTypes = {
    id: PropTypes.number,
    closeOrderPage: PropTypes.func,
}

export default OrderPage;