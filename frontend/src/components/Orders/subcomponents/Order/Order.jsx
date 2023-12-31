import './Order.scss';

import truckIcon from '../../../../icons/orderTruck.svg';
import boxIcon from '../../../../icons/orderBox.svg';
import rateStarYellow from '../../../../icons/rateStarYellow.svg';
import rateStarDark from '../../../../icons/rateStarDark.svg';

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

    const { user, setUser, languageMode } = useContext(StoreContext)

    const [commentValue, setCommentValue] = useState('')
    const [rating, setRating] = useState(0);
    
    const [ratingItem, setRatingItem] = useState()

    const [loading, setLoading] = useState(false);

    let orderHeader;
    if (status === 'inDelivery') {
        orderHeader = (
            <delivery-status>
                <img src={truckIcon} alt='truck icon' />
                <p>{languageMode === 'en' ? 'In delivery...' : 'W dostawie...'}</p>
            </delivery-status>
        )
    } else if (status === 'delivered') {
        orderHeader = (
            <delivery-status>
                <img src={boxIcon} alt='box icon' />
                <p>{languageMode === 'en' ? 'Your order has been delivered' : 'Twoje zamówienia zostało dostarczone'}</p>
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
        setLoading(true);

        const { status, data } = await request.post('/users/review', {
            rating: rating, comment: commentValue, productId: id, userId: user.id
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

        setLoading(false);
    }

    useEffect(() => {
        fetchData(id);
    }, [id])

    useEffect(() => {
        if (productInfo.reviews !== undefined && productInfo.reviews.length > 0) {
            const rating = Math.round(productInfo.reviews.reduce(
                (accumulator, review) => accumulator + review.rating, 0) / productInfo.reviews.length)

            const stars = []
            for (let i = 0; i < rating; i++) {
                stars.push(<img key={i} src={rateStarYellow} alt='star selected' />)
            }
            for (let i = 0; i < (5 - rating); i++) {
                stars.push(<img key={5 - i} src={rateStarDark} alt='star unselected' />)
            }

            const ratingItem = (
                <product-rating>
                    <p>{`(${productInfo.reviews.length})`}</p>
                    <review-stars>{stars}</review-stars>
                    <p>{rating}</p>
                </product-rating>
            )
            setRatingItem(ratingItem)
        }
    },[productInfo.reviews])

    return (
        <order-item>
            <order-header>
                {orderHeader}
                {status === 'delivered' && !user.reviews.includes(id)? <>
                    <rating-btn onClick={()=>{setIsRatingOpen(true)}}>
                        {languageMode === 'en' ? 'Send a review' : 'Oceń produkt'}
                    </rating-btn>
                    <RateProduct
                        isOpen={isRatingOpen}
                        closeRating={() => setIsRatingOpen(false)}
                        handleSendReview={sendReview}
                        rating={rating}
                        handleChangeRating={(value)=>setRating(value)}
                        commentValue={commentValue}
                        handleChangeCommentValue={(value) => setCommentValue(value)}
                        loading={loading}
                    />
                </> :
                null }
            </order-header>
            <order-content>
                <inner-box>
                    <order-image>
                        {productInfo.images[0] !== undefined && <img src={productInfo.images[0]} alt={productInfo.name} />}
                    </order-image>
                    <order-info>
                        <product-name>
                            {productInfo.name}
                        </product-name>
                        <product-rating>
                            {ratingItem}
                        </product-rating>
                    </order-info>
                </inner-box>
                <product-price>
                    {languageMode === 'en' ? `US$ ${productInfo.price}` : `${productInfo.price * 4} zł`}
                </product-price>
            </order-content>
            <order-footer onClick={handleSeeMoreDetails}>
                {languageMode === 'en' ? 'See more details' : 'Zobacz więcej'}
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