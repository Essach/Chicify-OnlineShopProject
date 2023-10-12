import { useContext, useEffect, useState } from 'react';
import './OrderPage.scss';

import { PropTypes } from 'prop-types';

import request from '../../../../helpers/request';

import close from '../../../../icons/arrowLeftWhite.svg';

import { StoreContext } from '../../../../store/StoreProvider';  


const OrderPage = ({ productId ,paymentId, closeOrderPage }) => {

    const { user } = useContext(StoreContext);

    const [details, setDetails] = useState({
        address: {
            address: '',
            city: '',
            country: '',
            name: '',
        },
        cardInfo: {
            cvv: '',
            expiration: '',
            number: '',
            postal: '',
        }
    })
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

    let status;
    if (user.orders.find(payment => payment.paymentId === paymentId).products.find(prod => prod.id === productId).status === 'inDelivery') {
        status = (
            <>
                <p className='status'>In delivery...</p>
            </>
        )
    } else if (user.orders.find(payment => payment.paymentId === paymentId).products.find(prod => prod.id === productId).status === 'delivered') {
        status = (
            <>
                <p className='status'>Your order is ready to collect</p>
            </>
        )
    }


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

    const fetchProductData = async (id) => {
        const { data } = await request.get(`/products/${id}`);
        setProductInfo(data.product);
    }

    useEffect(() => {
        setMoreDetails(paymentId)
    }, [paymentId]);

    useEffect(() => {
        fetchProductData(productId)   
    },[productId])

    console.log(details)

    return (
        <order-page>
            <close-btn>
                <img src={close} alt='go back' onClick={closeOrderPage}/>
            </close-btn>
            <inner-box>
                <box-title>
                    More order details
                </box-title>
                <product-item>
                    <order-image>
                        <img src={productInfo.images[0]} alt={`${productInfo.name} image`} />
                    </order-image>
                    <order-info>
                        <product-name>
                            {productInfo.name}
                        </product-name>
                        <product-reviews>
                            
                        </product-reviews>
                    </order-info>
                </product-item>
                <order-details>
                    <info-price>
                        <p>Product price: {productInfo.price}</p>
                        <p>Total order price: {details.price}</p>
                    </info-price>
                    <info-delivery>
                        <p>Delivery status: {status}</p>
                    </info-delivery>
                    <info-address>
                        <p>Delivery address: {`${details.address.country} ${details.address.city} ${details.cardInfo.postal} ${details.address.address}`}</p>
                        <p>Recipient name: {details.address.name}</p>
                    </info-address>
                    <info-card>
                        <p className='title'>Card info:</p>
                        <p className='sub'>Card number: {details.cardInfo.number}</p>
                        <p className='sub'>Expiry date: {details.cardInfo.expiration}</p>
                        <p className='sub'>CVV number: {details.cardInfo.cvv}</p>
                    </info-card>
                </order-details>
            </inner-box>
        </order-page>
    );
}

OrderPage.propTypes = {
    productId: PropTypes.string,
    paymentId: PropTypes.number,
    closeOrderPage: PropTypes.func,
}

export default OrderPage;