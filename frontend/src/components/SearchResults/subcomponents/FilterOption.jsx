import { useState } from 'react';
import star from '../../../icons/star.svg';
import { PropTypes } from 'prop-types';

const FilterOption = (props) => {
    const { starFilter, priceFilterBottom, priceFilterTop, changeStarFilter, changePriceFilterBottom, changePriceFilterTop } = props;

    const [areOptionsVIsible, setAreOptionsVisible] = useState(false);
    const handleClickFilterBtn = () => setAreOptionsVisible(prev => !prev);

    return (
        <filter-option>
            <filter-btn onClick={handleClickFilterBtn}>
                Filter
            </filter-btn>
            <div className={`filter-options-${areOptionsVIsible ? 'visible' : 'hidden'}`}>
                <price-option>
                    <price-title>
                        Price:
                    </price-title>
                    <price-interval>
                        <input type="number" value={priceFilterBottom} onChange={changePriceFilterBottom}/>
                        <div className="line"></div>
                        <input type="number" value={priceFilterTop === 0 ? '' : priceFilterTop} onChange={changePriceFilterTop}/>
                    </price-interval>
                </price-option>
                <rating-option>
                    <rating-title>Rating:</rating-title>
                    <rating-options>
                        <div className='rating-section'>
                            <p>5</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className='rating-section'>
                            <p>4</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className='rating-section'>
                            <p>3</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className='rating-section'>
                            <p>2</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className='rating-section'>
                            <p>1</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className='rating-section'>
                            <p>Any</p>
                        </div>
                    </rating-options>
                </rating-option>
            </div>
        </filter-option>
    );
}

FilterOption.propTypes = {
    starFilter: PropTypes.string,
    priceFilterBottom: PropTypes.number,
    priceFilterTop: PropTypes.number,
    changeStarFilter: PropTypes.func,
    changePriceFilterBottom: PropTypes.func,
    changePriceFilterTop: PropTypes.func
}

export default FilterOption;