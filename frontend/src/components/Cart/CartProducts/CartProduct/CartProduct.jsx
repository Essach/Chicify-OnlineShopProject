import './CartProduct.scss';

import deliveryIcon from '../../../../icons/deliveryIcon.svg';
import plus from '../../../../icons/plus.svg';
import minus from '../../../../icons/minus.svg';
import trashcan from '../../../../icons/trashcanCart.svg';
import rateStarYellow from '../../../../icons/rateStarYellow.svg';
import rateStarDark from '../../../../icons/rateStarDark.svg';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../../context/CartContext';
import { useNavigate } from 'react-router';
import { StoreContext } from '../../../../store/StoreProvider';

const CartProduct = (props) => {
    const { id, image, name, reviews, delivery, quantity, maxQuantity, price } = props;

    const [imageLink, setImageLink] = useState('');

    const { dispatch } = useContext(CartContext);

    const { languageMode } = useContext(StoreContext);

    const [deliveryDate, setDeliveryDate] = useState('')

    const deliveryPrices = delivery.map(option => option.price);
    const cheapestDeliveryPrice = Math.min(...deliveryPrices);

    const navigate = useNavigate();

    const [currentQuantity, setCurrentQuantity] = useState(parseInt(quantity));

    const [ratingItem, setRatingItem] = useState()

    const handleChangeCurrentQuantity = e => {
        if (parseInt(e.target.value) > maxQuantity) {
            setCurrentQuantity(maxQuantity);
            dispatch({
                type: 'EDIT',
                payload: {
                    id: id,
                    quantity: maxQuantity
                }
            })
        } else if (parseInt(e.target.value) < 1) {
            setCurrentQuantity(1)
            dispatch({
                type: 'EDIT',
                payload: {
                    id: id,
                    quantity: 1
                }
            })
        } else if (e.target.value === '') {
            setCurrentQuantity(e.target.value)
        } else {
            setCurrentQuantity(parseInt(e.target.value))
            dispatch({
                type: 'EDIT',
                payload: {
                    id: id,
                    quantity: parseInt(e.target.value)
                }
            })
        }
    }
    const handleIncreaseCurrentQuantity = () => {
        if (currentQuantity < maxQuantity) {
            setCurrentQuantity(prev => prev + 1)
            dispatch({
                type: 'EDIT',
                payload: {
                    id: id,
                    quantity: parseInt(currentQuantity + 1)
                }
            })
        }
    }
    const handleDecreaseCurrentQuantity = () => {
        if (currentQuantity > 1) {
            setCurrentQuantity(prev => prev - 1);
            dispatch({
                type: 'EDIT',
                payload: {
                    id: id,
                    quantity: parseInt(currentQuantity - 1)
                }
            })
        }
    }
    const handleBlurQuantityInput = () => {
        if (currentQuantity === '') {
            setCurrentQuantity(1)
            dispatch({
                type: 'EDIT',
                payload: {
                    id: id,
                    quantity: 1,
                }
            })
        }
    }

    const handleOnClickProduct = () => {
        navigate(`/product/${id}`)
        window.scrollTo(0, 0);
    }

    const handleOnClickDeleteFromCart = () => {
        dispatch({
            type: 'DELETE',
            payload: {
                id: id,
            }
        })
    }

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
                <product-rating>
                    <p>{`(${reviews.length})`}</p>
                    <review-stars>{stars}</review-stars>
                    <p>{rating}</p>
                </product-rating>
            )
            setRatingItem(ratingItem)
        }
    },[reviews])

    useEffect(() => {
        setImageLink(image.url);
    }, [image])
    
        useEffect(() => {
        function getOrdinalSuffix(day) {
            if (languageMode === 'pl') {
                return '-ego'
            }
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            var lastDigit = day % 10;
            switch (lastDigit) {
                case 1:
                return 'st';
                case 2:
                return 'nd';
                case 3:
                return 'rd';
                default:
                return 'th';
            }
        }

        const currentDate = new Date();

        // Add 7 days to the current date
        currentDate.setDate(currentDate.getDate() + 7);

        // Get the day and month from the updated date
        const day = currentDate.getDate();
        const monthIndex = currentDate.getMonth();

        // Create an array of month names
        const monthNames = languageMode === 'en' ? [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ] : ["Stycznia", "Lutego", "Marca", "Kwietnia",
            "Maja", "Czerwca", "Lipca", "Sierpnia",
            "Września", "Października", "Listopada", "Grudnia"];

        // Format the result as 'day month'
        const formattedDate = day + getOrdinalSuffix(day) + ' ' + monthNames[monthIndex];

        // Display the result
        setDeliveryDate(formattedDate);
    },[languageMode])

    return (
        <cart-product>
            <inner-container onClick={handleOnClickProduct}>
                <product-image>
                    <img src={imageLink} alt={`${name} image`} />
                </product-image>
                <product-info>
                    <info-top>
                        <product-name>{name}</product-name>
                        <product-rating>
                            {ratingItem}
                        </product-rating>
                    </info-top>
                    <info-bottom>
                        <div>
                            <img src={deliveryIcon} alt='delivery truck' />
                            <p>{languageMode === 'en' ? `Delivery by ${deliveryDate}` : `Dostawa od ${deliveryDate}`}</p>
                        </div>
                        <div>
                            <p>{languageMode === 'en' ? `Delivery from US$ ${cheapestDeliveryPrice}` : `Dostawa od ${cheapestDeliveryPrice * 4}zł`}</p>
                        </div>
                    </info-bottom>
                </product-info>
            </inner-container>
            <quantity-button>
                <div className='side' onClick={handleDecreaseCurrentQuantity}><img src={minus} alt='decrease quantity'/></div>
                <div className='center'><input type="number" value={currentQuantity} onChange={handleChangeCurrentQuantity} onBlur={handleBlurQuantityInput}/></div>
                <div className='side' onClick={handleIncreaseCurrentQuantity}><img src={plus} alt='increase quantity'/></div>
            </quantity-button>
            <delete-button onClick={handleOnClickDeleteFromCart}>
                <img src={trashcan} alt="remove product from cart" />
            </delete-button>
            <product-price>{languageMode === 'en' ? `US$${price}` : `${price * 4} zł`}</product-price>
        </cart-product>
    );
}

CartProduct.propTypes = {
    id: PropTypes.string,
    image: PropTypes.object, 
    name: PropTypes.string, 
    reviews: PropTypes.array, 
    delivery: PropTypes.array, 
    quantity: PropTypes.number,
    maxQuantity: PropTypes.number,
    price: PropTypes.number,
}

export default CartProduct;