import './RateProduct.scss';
import { PropTypes } from 'prop-types';
import Modal from '../../../Modal/Modal';

import rateStarTitle from '../../../../icons/rateStarTitle.svg';
import rateStarYellow from '../../../../icons/rateStarYellow.svg';
import rateStarDark from '../../../../icons/rateStarDark.svg';
import close from '../../../../icons/closeBlack.svg';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../../store/StoreProvider';

const RateProduct = (props) => {
    const { isOpen,
        closeRating,
        handleSendReview,
        rating,
        handleChangeRating,
        commentValue,
        handleChangeCommentValue } = props;

    const { languageMode } = useContext(StoreContext);
    
    const [starsSelected, setStarsSelected] = useState([])
    const [starsUnselected, setStarsUnselected] = useState([])

    useEffect(() => {
        const starsSelected = [];
        const starsUnselected = [];
        for (let i = 0; i < rating; i++) {
            starsSelected.push(<img key={i} src={rateStarYellow} alt='star selected' onClick={()=>handleChangeRating(i+1)}/>)
        }
        for (let i = 0; i < (5-rating); i++) {
            starsUnselected.push(<img key={5-i} src={rateStarDark} alt='star unselected' onClick={()=>handleChangeRating(rating + i + 1)}/>)
        }
        setStarsSelected(starsSelected);
        setStarsUnselected(starsUnselected)
    },[rating, handleChangeRating])

    return (
    <Modal isOpen={isOpen} handleOnClose={closeRating} shouldBeClosedOnOutsideClick={false}>
        <rate-product>
            <rp-top>
                <rp-title>
                    <img src={rateStarTitle} alt='Rate the product'/>
                    <p>{languageMode === 'en' ? 'Rate the product' : 'Oceń produkt'}</p>
                </rp-title>
                <img src={close} alt='close' onClick={closeRating} className='close'/>
            </rp-top>
            <rating-forms>
                <star-rating-form>
                    <p>{languageMode === 'en' ? 'Select a rating' : 'Wybierz ocenę'}</p>
                    <star-rating-selection>
                        <p>{rating}</p>
                        <stars-list>
                            {starsSelected}
                            {starsUnselected}
                        </stars-list>
                    </star-rating-selection>
                </star-rating-form>
                <comment-form>
                    <p>{languageMode === 'en' ? 'Comment:' : 'Komentarz' }</p>
                        <textarea placeholder={languageMode === 'en' ? 'Enter your comment...' : 'Wpisz komentarz...'} value={commentValue} onChange={(e)=>handleChangeCommentValue(e.target.value)}/>
                </comment-form>
            </rating-forms>
                <send-review-btn onClick={() => {
                    handleSendReview()
                }}>
                <p>{languageMode === 'en' ? 'Send review' : 'Wyślij opinię'}</p>
            </send-review-btn>
        </rate-product>
    </Modal>
    );
}

RateProduct.propTypes = {
    isOpen: PropTypes.bool,
    closeRating: PropTypes.func,
    handleSendReview: PropTypes.func,
    rating: PropTypes.number,
    handleChangeRating: PropTypes.func,
    commentValue: PropTypes.string,
    handleChangeCommentValue: PropTypes.func,
}

export default RateProduct;