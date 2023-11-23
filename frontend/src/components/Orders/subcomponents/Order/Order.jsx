import './Order.scss';

import truckIcon from '../../../../icons/orderTruck.svg';
import boxIcon from '../../../../icons/orderBox.svg';

import request from '../../../../helpers/request';

import { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import RateProduct from '../RateProduct/RateProduct';

import {StoreContext} from '../../../../store/StoreProvider';
import { updateUser } from '../../../../helpers/localStorage';

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

    const { user, setUser } = useContext(StoreContext)

    const [commentValue, setCommentValue] = useState('')
    const [rating, setRating] = useState(0);

    let orderHeader;
    if (status === 'inDelivery') {
        orderHeader = (
            <delivery-status>
                <img src={truckIcon} alt='truck icon' />
                <p>In delivery...</p>
            </delivery-status>
        )
    } else if (status === 'delivered') {
        orderHeader = (
            <delivery-status>
                <img src={boxIcon} alt='box icon' />
                <p>Your order has been delivered</p>
            </delivery-status>
        )
    }

    const fetchData = async (id) => {
        const { data, status } = await request.get(`/products/${id}`);
        if (status === 200) {
            const productInfo = data.product;
            productInfo.images = productInfo.images.map(image => image.url);
            setProductInfo(productInfo);
        }
    }

    const handleSeeMoreDetails = () => {
        setOrderId()
        openOrderPage()
    }

    const [isRatingOpen, setIsRatingOpen] = useState(false);

    const sendReview = async () => {
        const { status, data } = await request.post('/users/review', {
            rating: rating, comment: commentValue, productId: id, userId: user.userId
        })

        if (status === 200) {
            updateUser(data.user);
            setUser(data.user);
            setIsRatingOpen(false);
            setRating(0);
            setCommentValue('');
        }
        else {
            throw new Error(data.message);
        }
    }

    useEffect(() => {
        fetchData(id);
    }, [id])

    return (
        <order-item>
            <order-header>
                {orderHeader}
                {status === 'delivered' && !user.reviews.includes(id)? <>
                    <rating-btn onClick={()=>{setIsRatingOpen(true)}}>
                        Send a review
                    </rating-btn>
                    <RateProduct
                        isOpen={isRatingOpen}
                        closeRating={() => setIsRatingOpen(false)}
                        handleSendReview={sendReview}
                        rating={rating}
                        handleChangeRating={(value)=>setRating(value)}
                        commentValue={commentValue}
                        handleChangeCommentValue={(value)=>setCommentValue(value)}
                    />
                </> :
                null }
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