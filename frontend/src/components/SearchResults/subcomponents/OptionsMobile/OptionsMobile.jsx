import FilterOption from "../FilterOption";
import SortOption from "../SortOption";

import { PropTypes } from 'prop-types';

import changeViewToBig from '../../../../icons/changeViewBigMobile.svg';
import changeViewToSmall from '../../../../icons/changeViewSmallMobile.svg';

import './OptionsMobile.scss';

import Modal from '../../../Modal/Modal';
import { useEffect, useState } from "react";

const OptionsMobile = (props) => {
    const { starFilter,
        priceFilterBottom,
        priceFilterTop,
        changeStarFilter,
        changePriceFilterBottom,
        changePriceFilterTop,
        sortOption,
        changeSortOption,
        handleChangeViewMode,
        viewMode } = props
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOnCloseFilter = () => setIsFilterOpen(false);
    const handleOnClickFilter = () => setIsFilterOpen(true);

    const [areOptionsMobileFixed, setAreOptionsMobileFixed] = useState(false);

    useEffect(() => {
        const scrollFunc = () => {
            if (window.scrollY >= 76) {
                setAreOptionsMobileFixed(true);
            } else {
                setAreOptionsMobileFixed(false);
            }
        }
        
        window.addEventListener('scroll', scrollFunc);

        return () => {
            window.removeEventListener('scroll', scrollFunc);
        }
    },[])

    return (
        <div className={`options-mobile-${areOptionsMobileFixed ? 'fixed' : 'normal'}`}>
            <filter-mobile>
                <p onClick={handleOnClickFilter}>Filter</p>
                <Modal handleOnClose={handleOnCloseFilter} isOpen={isFilterOpen} shouldBeClosedOnOutsideClick={true}>
                    <FilterOption
                        starFilter={starFilter}
                        priceFilterBottom={priceFilterBottom}
                        priceFilterTop={priceFilterTop}
                        changeStarFilter={changeStarFilter}
                        changePriceFilterBottom={changePriceFilterBottom}
                        changePriceFilterTop={changePriceFilterTop}
                        handleOnCloseFilter={handleOnCloseFilter}
                        />
                </Modal>
            </filter-mobile>
            <SortOption sortOption={sortOption} changeSortOption={changeSortOption}/>
            <change-view-btn onClick={handleChangeViewMode}>
                {viewMode === 'small' ?
                    <img src={changeViewToBig} alt='change view' /> :
                    <img src={changeViewToSmall} alt='change view' />
                }
                <p>Change view</p>
            </change-view-btn>
        </div>
    );
}

OptionsMobile.propTypes = {
    starFilter: PropTypes.string,
    priceFilterBottom: PropTypes.string,
    priceFilterTop: PropTypes.string,
    changeStarFilter: PropTypes.func,
    changePriceFilterBottom: PropTypes.func,
    changePriceFilterTop: PropTypes.func,
    sortOption: PropTypes.string,
    changeSortOption: PropTypes.func,
    handleChangeViewMode: PropTypes.func,
    viewMode:PropTypes.string,
}

export default OptionsMobile;