import { useState } from "react";
import SortOption from "../SortOption";
import './SearchResultsBottom.scss';
import changeViewToBig from '../../../../icons/changeViewBig.svg';
import changeViewToSmall from '../../../../icons/changeViewSmall.svg';
import FilterOption from "../FilterOption";


const SearchResultsBottom = () => {
    const [sortOption, setSortOption] = useState('accuracy');
    const changeSortOption = (option) => setSortOption(option);

    const [viewMode, setViewMode] = useState('small');
    const handleChangeViewMode = () => {
        if (viewMode === 'small') setViewMode('big');
        if (viewMode === 'big') setViewMode('small')
    }
    
    const [starFilter, setStarFilter] = useState('any');
    const [priceFilterBottom, setPriceFilterBottom] = useState(0);
    const [priceFilterTop, setPriceFilterTop] = useState(0);
    const changeStarFilter = (option) => setStarFilter(option);
    const changePriceFilterTop = (option) => setPriceFilterTop(option);
    const changePriceFilterBottom = (option) => setPriceFilterBottom(option);

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
            <search-results>
            </search-results>
        </sr-bottom>
    );
}

export default SearchResultsBottom;