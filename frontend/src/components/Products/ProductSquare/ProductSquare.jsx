import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import star from '../../../icons/star.svg';
import halfStar from '../../../icons/halfStar.svg';
import deliveryIcon from '../../../icons/deliveryIcon.svg';

import './ProductSquare.scss';

const ProductSquare = (props) => {
    const { id, name, price, delivery, images, reviews } = props;

    const [productRating, setProductRating] = useState(0);
    const [starRating, setStarRating] = useState(null);

    useEffect(() => {
        let rating = 0;
        reviews.forEach(review => {
            rating += review.rating;
        })
        rating = (rating / reviews.length).toFixed(1);

        let stars = []
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.concat(star)
        }
        if (Math.round(rating) === rating + 1) {
            star.concat(halfStar)
        }

        setStarRating(stars);
        setProductRating(rating);
    }, [])

    let productReviews = null;
    if (reviews.length > 0) {
        productReviews = (
            <product-reviews>
                <div>`(${reviews.length})`</div>
                <div>{starRating}</div>
                <div>{productRating}</div>
            </product-reviews>
        )
    }

    const deliveryPrices = delivery.map(option => option.price);
    const cheapestDeliveryPrice = Math.min(...deliveryPrices);


    const navigate = useNavigate();

    const handleOnClickProduct = () => {
        navigate(`/product/${id}`);
        navigate(0)
    }

    return (
        <div onClick={handleOnClickProduct} className='productSquareBox'>
            <product-inner-box>
                <product-image>
                    <img src={images[0]} />
                </product-image>
                <product-info>
                    <info-top>
                        <product-name>{name}</product-name>
                        <product-reviews>
                            {productReviews}
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
            </product-inner-box>
            <product-price>
                <p>
                    {`US$ ${price}`}
                </p>
            </product-price>
        </div>
    );
}

ProductSquare.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    delivery: PropTypes.array,
    quantity: PropTypes.number,
    images: PropTypes.array,
    categories: PropTypes.array,
    reviews: PropTypes.array
}

export default ProductSquare;