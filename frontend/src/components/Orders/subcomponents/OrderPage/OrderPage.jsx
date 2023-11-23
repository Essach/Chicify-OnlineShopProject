import { useContext, useEffect, useState } from 'react';
import './OrderPage.scss';

import { PropTypes } from 'prop-types';

import request from '../../../../helpers/request';

import close from '../../../../icons/arrowLeftWhite.svg';

import { StoreContext } from '../../../../store/StoreProvider';  
import { useNavigate } from 'react-router';


const OrderPage = ({ productId ,paymentId, closeOrderPage }) => {

    const { user } = useContext(StoreContext);

    const navigate = useNavigate();

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
        },
        price: 0,
        products: [],
    })
    const [productInfo, setProductInfo] = useState({
        ID: '',
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
                <span className='status'>In delivery...</span>
            </>
        )
    } else if (user.orders.find(payment => payment.paymentId === paymentId).products.find(prod => prod.id === productId).status === 'delivered') {
        status = (
            <>
                <span className='status'>Your order is ready to collect</span>
            </>
        )
    }

    let q;
    let allQ = 0;
    for (let i = 0; i < details.products.length; i++){
        if (details.products[i].id === productInfo.ID) {
            q = details.products[i].quantity
        }
        allQ = allQ + details.products[i].quantity
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
        const { data, status } = await request.get(`/products/${id}`);
        if (status === 200) {
            const productInfo = data.product;
            productInfo.images = productInfo.images.map(image => image.url);
            setProductInfo(productInfo);
        }
    }

    const handleClickProductItem = () => {
        navigate(`/product/${productId}`)
    }

    useEffect(() => {
        setMoreDetails(paymentId)
    }, [paymentId]);

    useEffect(() => {
        fetchProductData(productId)   
    },[productId])


    return (
        <order-page>
            <close-btn>
                <img src={close} alt='go back' onClick={closeOrderPage}/>
            </close-btn>
            <inner-box>
                <box-title>
                    More order details
                </box-title>
                <product-item onClick={handleClickProductItem}>
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
                    <info-quantity>
                        <p>Product quantity: {q}</p>
                        <p>All products quantity: {allQ}</p>
                    </info-quantity>
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