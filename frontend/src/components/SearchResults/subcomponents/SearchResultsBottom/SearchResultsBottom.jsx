import { useEffect, useRef, useState } from "react";
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

    const srBottomRef = useRef();
    const srBottomLeftRef = useRef();
    const [srOptionsTop, setSrOptionsTop] = useState(0);
    const [isPositionFixed, setIsPositionFixed] = useState(false);
    const [srOptionsWidth, setSrOptionsWidth] = useState(0)

    useEffect(() => {
        setSrOptionsTop(srBottomRef.current.getBoundingClientRect().top)
        const scrollFunc = () => {
            console.log(srBottomRef.current.getBoundingClientRect().top)
            if (srBottomRef.current.getBoundingClientRect().top <= 100) {
                setSrOptionsTop(100);
                setIsPositionFixed(true);
            } 
            else {
                setIsPositionFixed(false)
            }
        }

        setSrOptionsWidth(srBottomLeftRef.current.getBoundingClientRect().right - srBottomLeftRef.current.getBoundingClientRect().left);
        const resizeFunc = () => {
            setSrOptionsWidth(srBottomLeftRef.current.getBoundingClientRect().right - srBottomLeftRef.current.getBoundingClientRect().left)
        }

        window.addEventListener('scroll', scrollFunc);
        window.addEventListener('resize', resizeFunc);

        return () => {
            window.removeEventListener('scroll', scrollFunc);
        }
    },[])

    // useEffect(() => {
    //     console.log("here") 
    // },[])


    return (
        <sr-bottom ref={srBottomRef}>
            <sr-bottom-left ref={srBottomLeftRef}>
                <div className="sr-options" style={isPositionFixed ?
                    {
                        gridArea: 'options',
                        backgroundColor: '#F5F5F5',
                        height: '58vh',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        overflow: 'hidden',
                        outline: '1px',
                        position: 'fixed',  
                        top: `${srOptionsTop}px`,
                        width: `${srOptionsWidth}px`,
                    } : 
                    {
                        gridArea: 'options',
                        backgroundColor: '#F5F5F5',
                        height: '58vh',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        overflow: 'hidden',
                        outline: '1px',
                        position: 'static',  
                    }
                }>
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
                </div>
            </sr-bottom-left>
            <SearchProducts viewMode={viewMode} starFilter={starFilter} priceBottom={priceFilterBottom} priceTop={priceFilterTop} itemName={itemName} />
        </sr-bottom>
    );
}

SearchResultsBottom.propTypes = {
    itemName: PropTypes.string,
}

export default SearchResultsBottom;