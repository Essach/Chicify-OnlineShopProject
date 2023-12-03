import { useContext, useEffect, useState } from 'react';
import './OrderPage.scss';

import { PropTypes } from 'prop-types';

import request from '../../../../helpers/request';

import close from '../../../../icons/arrowLeftWhite.svg';

import { StoreContext } from '../../../../store/StoreProvider';  
import { useNavigate } from 'react-router';


const OrderPage = ({ productId ,paymentId, closeOrderPage }) => {

    const { user, languageMode } = useContext(StoreContext);

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
                <span className='status'>{languageMode === 'en' ? 'In delivery...' : 'W dostawie...'}</span>
            </>
        )
    } else if (user.orders.find(payment => payment.paymentId === paymentId).products.find(prod => prod.id === productId).status === 'delivered') {
        status = (
            <>
                <span className='status'>{languageMode === 'en' ? 'Your order has been delivered' : 'Twoje zamówienia zostało dostarczone'}</span>
            </>
        )
    }

    let q;
    let allQ = 0;
    for (let i = 0; i < details.products.length; i++){
        if (details.products[i].id === productInfo.id) {
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
                    {languageMode === 'en' ? 'More order details' : 'Więcej o zamówieniu'}
                </box-title>
                <product-item onClick={handleClickProductItem}>
                    <order-image>
                        {productInfo.images[0] !== undefined && <img src={productInfo.images[0]} alt={`${productInfo.name} image`} /> }
                    </order-image>
                    <order-info>
                        <product-name>
                            {productInfo.name}
                        </product-name>
                    </order-info>
                </product-item>
                <order-details>
                    <info-quantity>
                        <p>{languageMode === 'en' ? `Product quantity: ${q}` : `Ilość produktu: ${q}`}</p>
                        <p>{languageMode === 'en' ? `All products quantity: ${allQ}` : `Ilość wszystkich produktów ${allQ}`}</p>
                    </info-quantity>
                    <info-price>
                        <p>{languageMode === 'en' ? `Product price: US$ ${productInfo.price}` : `Cena produktu ${productInfo.price*4} zł`}</p>
                        <p>{languageMode === 'en' ? `Total order price: US$ ${details.price}` : `Cena całego zamówienia ${productInfo.price*4} zł`}</p>
                    </info-price>
                    <info-delivery>
                        <p>{languageMode === 'en' ? `Delivery status:` : `Status wysyłki:`} {status}</p>
                    </info-delivery>
                    <info-address>
                        <p>{languageMode === 'en' ? `Delivery address:` : 'Adres wysyłki'} {`${details.address.country} ${details.address.city} ${details.cardInfo.postal} ${details.address.address}`}</p>
                        <p>{languageMode === 'en' ? 'Recipient name:' : 'Imie adresata:'} {details.address.name}</p>
                    </info-address>
                    <info-card>
                        <p className='title'>{languageMode === 'en' ? 'Card info:' : 'Informacje o karcie kredytowej'}</p>
                        <p className='sub'>{languageMode === 'en' ? 'Card number:' : 'Numer karty kredytowej'} {details.cardInfo.number}</p>
                        <p className='sub'>{languageMode === 'en' ? 'Expiry date:' : 'Termin ważności'} {details.cardInfo.expiration}</p>
                        <p className='sub'>{languageMode === 'en' ? 'CVV number:' : 'Numer CVV'} {details.cardInfo.cvv}</p>
                    </info-card>
                </order-details>
            </inner-box>
        </order-page>
    );
}

OrderPage.propTypes = {
    productId: PropTypes.string,
    paymentId: PropTypes.string,
    closeOrderPage: PropTypes.func,
}

export default OrderPage;