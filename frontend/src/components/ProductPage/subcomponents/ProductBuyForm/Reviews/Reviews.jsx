import request from "../../../../../helpers/request";
import Modal from "../../../../Modal/Modal";
import PropTypes from 'prop-types';

import rateStarYellow from '../../../../../icons/rateStarYellow.svg';
import rateStarDark from '../../../../../icons/rateStarDark.svg';
import close from '../../../../../icons/closeBlack.svg';
import { useContext, useEffect, useState } from "react";

import './Reviews.scss';
import { StoreContext } from '../../../../../store/StoreProvider';

const Reviews = (props) => {
    const { isOpen, closeReviews, reviews, productName } = props;

    const [renderedReviews, setRenderedReviews] = useState([]);

    const {languageMode} = useContext(StoreContext)

    useEffect(() => {
        const fetchData = async () => {
        const renderedReviewsPromises = reviews.map(async (review) => {
            const { status, data } = await request.get(`/users/${review.userId}`);
    
            if (status === 200) {
            const stars = [];
            for (let i = 0; i < review.rating; i++) {
                stars.push(<img key={i} src={rateStarYellow} alt='star selected' />);
            }
            for (let i = 0; i < (5 - review.rating); i++) {
                stars.push(<img key={5 - i} src={rateStarDark} alt='star unselected' />);
            }
    
            return (
                <user-review key={review.userId}>
                    <review-username>{data.username}</review-username>
                    <review-rating>
                        {review.rating}
                        <review-stars>{stars}</review-stars>
                    </review-rating>
                    <review-comment>
                        <p>{languageMode === 'en' ? 'Comment:' : 'Komentarz:'}</p>
                        <comment-area>
                            {review.comment}
                        </comment-area>
                    </review-comment>
                </user-review>
            );
            }
    
            return null;
        });

        const renderedReviewsArray = await Promise.all(renderedReviewsPromises);
        setRenderedReviews(renderedReviewsArray);
    };

    fetchData();
    }, [reviews]);

    return (
        <Modal isOpen={isOpen} handleOnClose={closeReviews} shouldBeClosedOnOutsideClick={true}>
            <product-reviews-window>
                <reviews-title>
                    <p>{languageMode === 'en' ? 'Reviews for:' : 'Oceny dla:'} {productName}</p>
                    <img src={close} alt="close reviews" onClick={closeReviews}/>
                </reviews-title>
                <user-reviews>
                    {renderedReviews.length > 0 ? renderedReviews : <p>{`Couldn't load reviews`}</p>}
                </user-reviews>
            </product-reviews-window>
        </Modal>
    );
    }

Reviews.propTypes = {
    isOpen: PropTypes.bool,
    closeReviews: PropTypes.func,
    reviews: PropTypes.array,
    productName: PropTypes.string,
}

export default Reviews;