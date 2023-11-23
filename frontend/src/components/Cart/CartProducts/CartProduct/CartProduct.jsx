import './CartProduct.scss';

import deliveryIcon from '../../../../icons/deliveryIcon.svg';
import plus from '../../../../icons/plus.svg';
import minus from '../../../../icons/minus.svg';
import trashcan from '../../../../icons/trashcanCart.svg';

import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../../context/CartContext';
import { useNavigate } from 'react-router';

const CartProduct = (props) => {
    const { id, image, name, reviews, delivery, quantity, maxQuantity, price } = props;

    const [imageLink, setImageLink] = useState('');

    const { dispatch } = useContext(CartContext);

    const deliveryPrices = delivery.map(option => option.price);
    const cheapestDeliveryPrice = Math.min(...deliveryPrices);

    const navigate = useNavigate();

    const [currentQuantity, setCurrentQuantity] = useState(parseInt(quantity));

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
        setImageLink(image.url);
    },[image])

    return (
        <cart-product>
            <inner-container onClick={handleOnClickProduct}>
                <product-image>
                    <img src={imageLink} alt={`${name} image`} />
                </product-image>
                <product-info>
                    <info-top>
                        <product-name>{name}</product-name>
                        <product-reviews>
                            
                        </product-reviews>
                    </info-top>
                    <info-bottom>
                        <div>
                            <img src={deliveryIcon} alt='delivery truck'/>
                            <p>Delivery by ...</p>
                        </div>
                        <div>
                            <p>{`Delivery from US$ ${cheapestDeliveryPrice}`}</p>
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
            <product-price>{`US$ ${price}`}</product-price>
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