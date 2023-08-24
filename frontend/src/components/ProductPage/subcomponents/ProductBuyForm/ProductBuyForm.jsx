import './ProductBuyForm.scss';

import PropTypes from 'prop-types';

import deliveryIcon from '../../../../icons/deliveryIcon.svg';
import plus from '../../../../icons/plus.svg';
import minus from '../../../../icons/minus.svg';

import { useContext, useRef, useState } from 'react';
import { CartContext } from '../../../../context/CartContext';
import { useNavigate } from 'react-router';

const ProductBuyForm = (props) => {
    const { name, price, quantity, reviews, cheapestDeliveryPrice, id} = props

    const { dispatch } = useContext(CartContext);

    const navigate = useNavigate()

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const inputRef = useRef()

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
            console.log(e.target.value)
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
        dispatch({
            type: 'ADD',
            payload: {
                id: id,
                quantity: currentQuantity
            }
        })
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
            navigate(0);
            window.scrollTo(0, 0);
        }
    }


    return (  
        <product-buy-form>
            <product-name>
                <p>{name}</p>
            </product-name>
            <product-reviews>
                {reviews}
            </product-reviews>
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
            <quantity-button>
                <div className='side' onClick={handleDecreaseButton}><img src={minus} alt='decrease quantity' /></div>
                <div className='center'><input type="number" onChange={handleChangeQuantity} value={currentQuantity} ref={inputRef} /></div>
                <div className='side' onClick={handleIncreaseButton}><img src={plus} alt='increase quantity'/></div>
            </quantity-button>
            <buy-form-buttons>
                <div className='add-to-cart-button' onClick={handleAddToCartBtn}><p>Add to cart</p></div>
                <div className='buy-now-button' onClick={handleBuyNowBtn}><p>Buy now</p></div>
            </buy-form-buttons>
        </product-buy-form>
    );
}

ProductBuyForm.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    reviews: PropTypes.object,
    cheapestDeliveryPrice: PropTypes.number,
    id: PropTypes.string,
}

export default ProductBuyForm;