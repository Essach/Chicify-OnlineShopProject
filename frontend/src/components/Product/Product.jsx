import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import rateStarYellow from '../../icons/rateStarYellow.svg';
import rateStarDark from '../../icons/rateStarDark.svg';
import deliveryIcon from '../../icons/deliveryIcon.svg';
import deliveryIconWhite from '../../icons/deliveryTruckWhite.svg';
import productArrowRight from '../../icons/productArrowRight.svg';

import './Product.scss';

const ProductSquare = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { id, name, price, delivery, images, reviews, sellerId, type } = props;

    const [ratingItem, setRatingItem] = useState()
    
    const [imagesLinks, setImagesLinks] = useState([]);

    const [deliveryDate, setDeliveryDate] = useState('')

    const deliveryPrices = delivery.map(option => option.price);
    const cheapestDeliveryPrice = Math.min(...deliveryPrices);


    const navigate = useNavigate();

    const handleOnClickProduct = () => {
        navigate(`/product/${id}`);
        window.scrollTo(0, 0);
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
        setImagesLinks(images.map(image => image.url));
    }, [images])
    
    useEffect(() => {
        function getOrdinalSuffix(day) {
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
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        // Format the result as 'day month'
        const formattedDate = day + getOrdinalSuffix(day) + ' ' + monthNames[monthIndex];

        // Display the result
        setDeliveryDate(formattedDate);
    },[])

    return (
        <div onClick={handleOnClickProduct} className={type}>
            <product-inner-box>
                <product-image>
                    <img src={imagesLinks[0]} />
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
                            {type === 'rectangleFavoritesPage' ? <img src={deliveryIconWhite} alt='delivery truck' /> :
                                <img src={deliveryIcon} alt='delivery truck' />
                            }
                            <p>Delivery by {deliveryDate}</p>
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
            <product-arrow-right>
                <img src={productArrowRight} alt='' />
            </product-arrow-right>
        </div>
    );
}

ProductSquare.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    delivery: PropTypes.array,
    quantity: PropTypes.number,
    images: PropTypes.array,
    categories: PropTypes.array,
    reviews: PropTypes.array,
    sellerId: PropTypes.string,
    type: PropTypes.string,
}

export default ProductSquare;