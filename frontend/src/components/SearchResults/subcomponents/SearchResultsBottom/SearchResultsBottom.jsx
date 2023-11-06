import { useState } from "react";
import SortOption from "../SortOption";
import './SearchResultsBottom.scss';
import changeViewToBig from '../../../../icons/changeViewBig.svg';
import changeViewToSmall from '../../../../icons/changeViewSmall.svg';
import FilterOption from "../FilterOption";
import SearchProducts from "../SearchProducts";
import { PropTypes } from 'prop-types';


const SearchResultsBottom = ({itemName}) => {
    const [sortOption, setSortOption] = useState('accuracy');
    const changeSortOption = (option) => setSortOption(option);

    const [viewMode, setViewMode] = useState('small');
    const handleChangeViewMode = () => {
        if (viewMode === 'small') setViewMode('big');
        if (viewMode === 'big') setViewMode('small')
    }
    
    const [starFilter, setStarFilter] = useState('all');
    const [priceFilterBottom, setPriceFilterBottom] = useState('0');
    const [priceFilterTop, setPriceFilterTop] = useState('');
    const changeStarFilter = (option) => setStarFilter(option);
    const changePriceFilterTop = (e) => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined) {
            setPriceFilterTop(e.target.value);
        }
    }
    const changePriceFilterBottom = (e) => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined) {
            setPriceFilterBottom(e.target.value);
        }
    }

    return (
        <sr-bottom>
            <sr-options>
                <SortOption sortOption={sortOption} changeSortOption={changeSortOption} />
                <change-view-btn onClick={handleChangeViewMode}>
                    {viewMode === 'small' ?
                        <img src={changeViewToBig} alt='change view' /> :
                        <img src={changeViewToSmall} alt='change view' />
                    }
                    <p>Change view</p>
                </change-view-btn>
                <FilterOption
                    starFilter={starFilter}
                    priceFilterBottom={priceFilterBottom}
                    priceFilterTop={priceFilterTop}
                    changeStarFilter={changeStarFilter}
                    changePriceFilterBottom={changePriceFilterBottom}
                    changePriceFilterTop={changePriceFilterTop}
                />
                <filler-blocks>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                    <filler-block></filler-block>
                </filler-blocks>
            </sr-options>
            <SearchProducts viewMode={viewMode} starFilter={starFilter} priceBottom={priceFilterBottom} priceTop={priceFilterTop} itemName={itemName} />
        </sr-bottom>
    );
}

SearchResultsBottom.propTypes = {
    itemName: PropTypes.string,
}

export default SearchResultsBottom;