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
                        <input type="number" value={priceFilterTop} onChange={changePriceFilterTop}/>
                    </price-interval>
                </price-option>
                <rating-option>
                    <rating-title>Rating:</rating-title>
                    <rating-options>
                        <div className={`rating-section${ starFilter === '5star' ? '-selected' : '' }`} onClick={() => changeStarFilter('5star')}>
                            <p>5</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className={`rating-section${ starFilter === '4star' ? '-selected' : '' }`} onClick={() => changeStarFilter('4star')}>
                            <p>4</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className={`rating-section${ starFilter === '3star' ? '-selected' : '' }`} onClick={() => changeStarFilter('3star')}>
                            <p>3</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className={`rating-section${ starFilter === '2star' ? '-selected' : '' }`} onClick={() => changeStarFilter('2star')}>
                            <p>2</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className={`rating-section${ starFilter === '1star' ? '-selected' : '' }`} onClick={() => changeStarFilter('1star')}>
                            <p>1</p>
                            <star-icons>
                                <img src={star} alt='star'/>
                            </star-icons>
                        </div>
                        <div className={`rating-section${ starFilter === 'any' ? '-selected' : '' }`} onClick={() => changeStarFilter('any')}>
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
    priceFilterBottom: PropTypes.string,
    priceFilterTop: PropTypes.string,
    changeStarFilter: PropTypes.func,
    changePriceFilterBottom: PropTypes.func,
    changePriceFilterTop: PropTypes.func
}

export default FilterOption;