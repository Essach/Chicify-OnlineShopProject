import './ProductBuyForm.scss';

import PropTypes from 'prop-types';

import deliveryIcon from '../../../../icons/deliveryIcon.svg';
import plus from '../../../../icons/plus.svg';
import minus from '../../../../icons/minus.svg';
import favorite from '../../../../icons/favoritesDBlue.svg';
import favoriteFilled from '../../../../icons/favoritesDBlueFilled.svg';
import rateStarYellow from '../../../../icons/rateStarYellow.svg';
import rateStarDark from '../../../../icons/rateStarDark.svg';

import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../../../../context/CartContext';
import { useNavigate } from 'react-router';
import { StoreContext } from '../../../../store/StoreProvider';
import request from '../../../../helpers/request';
import { updateUser } from '../../../../helpers/localStorage';
import Login from '../../../Login/Login';
import Reviews from './Reviews/Reviews';

const ProductBuyForm = (props) => {
    // eslint-disable-next-line react/prop-types
    const { name, price, quantity, sellerId, reviews, cheapestDeliveryPrice, id} = props

    const { state, dispatch } = useContext(CartContext);

    const { user, setUser } = useContext(StoreContext);

    const navigate = useNavigate();

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const inputRef = useRef()

    const [isFavorite, setIsFavorite] = useState(false)

    const [ratingItem, setRatingItem] = useState();

    const [areReviewsOpen, setAreReviewsOpen] = useState(false);

    const [sellerName, setSellerName] = useState('');

    const handleIncreaseButton = () => {
        if (currentQuantity < quantity) {
            setCurrentQuantity(prev => prev + 1)
        }
    }
    const handleDecreaseButton = () => {
        if (currentQuantity > 1) {
            setCurrentQuantity(prev => prev - 1);
        }
    }
    const handleChangeQuantity = (e) => {
        if (parseInt(e.target.value) > quantity) {
            setCurrentQuantity(quantity)
        } else if (parseInt(e.target.value) < 1) {
            setCurrentQuantity(1)
        } else if (e.target.value === '') {
            setCurrentQuantity(e.target.value)
        } else {
            setCurrentQuantity(parseInt(e.target.value))
        }
    }

    const addToCart = () => {
        if (state !== undefined) {
            const prod = state.cart.find(item => item.id === id)
            if (prod !== undefined) {
                dispatch({
                    type: 'EDIT',
                    payload: {
                        id: id,
                        quantity: prod.quantity + currentQuantity,
                        sellerId: sellerId,
                        productName: name,
                    }
                })
            } else {
                dispatch({
                    type: 'ADD',
                    payload: {
                        id: id,
                        quantity: currentQuantity,
                        sellerId: sellerId,
                        productName: name,
                    }
                })
            }
        }       
    }
    
    const handleAddToCartBtn = () => {
        if (currentQuantity !== '') {
            addToCart();
        }
    }
    const handleBuyNowBtn = () => {
        if (currentQuantity !== '') {
            addToCart();
            navigate('/cart');
            window.scrollTo(0, 0);
        }
    }

    const handleAddToFavorites = async () => {
        if (user !== undefined && user !== null) {
            const { status, data } = await request.patch('/users/favorites', { userId: user.userId, productId: id, action: 'add' });
            if (status === 200) {
                setUser(data.user);
                updateUser(data.user);
            } else {
                throw new Error(data.message)
            }
        } else {
            setIsModalOpenLogin(true);
        }
    }

    const handleRemoveFromFavorites = async () => {
        if (user !== undefined && user !== null) {
        const { status, data } = await request.patch('/users/favorites', { userId: user.userId, productId: id, action: 'remove' });
            if (status === 200) {
                setUser(data.user);
                updateUser(data.user);
            } else {
                throw new Error(data.message)
            }
        } else {
            setIsModalOpenLogin(true);
        }
    }

    useEffect(() => {
        if (user !== undefined && user !== null) {
            if ((user.favorites.find(item => item === id)) !== undefined) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        } else {
            setIsFavorite(false);
        }
    }, [user, id])

    useEffect(() => {
        if (reviews !== undefined && reviews.length > 0) {
            const rating = Math.round(reviews.reduce(
                (accumulator, review) => accumulator + review.rating, 0) / reviews.length)

            const stars = []
            for (let i = 0; i < rating; i++) {
                stars.push(<img key={i} src={rateStarYellow} alt='star selected' />)
            }
            for (let i = 0; i < (5 - rating); i++) {
                stars.push(<img key={5 - i} src={rateStarDark} alt='star unselected' />)
            }

            const ratingItem = (
                <product-rating onClick={()=>setAreReviewsOpen(true)}>
                    <p>{`(${reviews.length})`}</p>
                    <review-stars>{stars}</review-stars>
                    <p>{rating}</p>
                </product-rating>
            )
            setRatingItem(ratingItem)
        }
    },[reviews])

    useEffect(() => {
        const fetchSellerName = async () => {
            const { data, status } = await request.get(`/users/${sellerId}`);

            if (status === 200) {
                setSellerName(data.username);
            }
        }

        fetchSellerName();
    },[sellerId])

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const handleOnCloseLogin = () => setIsModalOpenLogin(false);
    
    return ( 
        <>
            <product-buy-form>
                <product-name>
                    <p>{name}</p>
                    <p className='small'>{sellerName}</p>
                </product-name>
                <product-reviews-and-favorite>
                    {ratingItem}
                    {isFavorite ? <img src={favoriteFilled} alt='remove from favorites' onClick={handleRemoveFromFavorites} className='favoritesFilled'/> :
                        <img src={favorite} alt='add to favorites' onClick={handleAddToFavorites} className='favorites'/>
                    }
                    <Reviews isOpen={areReviewsOpen} closeReviews={() => setAreReviewsOpen(false)} reviews={reviews} productName={name} />
                </product-reviews-and-favorite>
                <delivery-info>
                    <div>
                        <img src={deliveryIcon} alt='delivery truck'/>
                        <p>Delivery by ...</p>
                    </div>
                    <div>
                        <p>{`Delivery from US$ ${cheapestDeliveryPrice}`}</p>
                    </div>
                </delivery-info>
                <product-price>
                    <p>
                        {`US$ ${price}`}
                    </p>
                </product-price>
                {quantity > 0 ?
                <quantity-button>
                    <div className='side' onClick={handleDecreaseButton}><img src={minus} alt='decrease quantity' /></div>
                    <div className='center'><input type="number" onChange={handleChangeQuantity} value={currentQuantity} ref={inputRef} /></div>
                    <div className='side' onClick={handleIncreaseButton}><img src={plus} alt='increase quantity' /></div>
                </quantity-button> : null}
                {quantity > 0 ?
                <buy-form-buttons>
                    <div className='add-to-cart-button' onClick={handleAddToCartBtn}><p>Add to cart</p></div>
                    <div className='buy-now-button' onClick={handleBuyNowBtn}><p>Buy now</p></div>
                </buy-form-buttons> : null}
            </product-buy-form>
            <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
        </>
    );
}

ProductBuyForm.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    reviews: PropTypes.array,
    cheapestDeliveryPrice: PropTypes.number,
    id: PropTypes.string,
}

export default ProductBuyForm;