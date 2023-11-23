import './MyProduct.scss';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";
import request from '../../../../helpers/request';

import rateStarYellow from '../../../../icons/rateStarYellow.svg';
import rateStarDark from '../../../../icons/rateStarDark.svg';

const MyProduct = (props) => {
    const { id, handleEditProduct } = props;

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

    const [ratingItem, setRatingItem] = useState();

    const fetchData = async (id) => {
        const { data, status } = await request.get(`/products/${id}`);
        
        if (status === 200) {
            const productInfo = data.product;
            productInfo.images = productInfo.images.map(image => image.url);
            setProductInfo(productInfo);
        }
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
        <my-product-item>
            <my-product-content>
                <inner-box>
                    <my-product-image>
                        <img src={productInfo.images[0]} alt={productInfo.name}/>
                    </my-product-image>
                    <my-product-info>
                        <product-name>
                            {productInfo.name}
                        </product-name>
                        <product-rating>
                            {ratingItem}
                        </product-rating>
                    </my-product-info>
                </inner-box>
                <product-price>
                    {`US$ ${productInfo.price}`}
                </product-price>
            </my-product-content>
            <my-product-footer onClick={() => { handleEditProduct(id) }}>
                Edit
            </my-product-footer>
        </my-product-item>
    );
}

MyProduct.propTypes = {
    id: PropTypes.string,
    handleEditProduct: PropTypes.func,
}

export default MyProduct;