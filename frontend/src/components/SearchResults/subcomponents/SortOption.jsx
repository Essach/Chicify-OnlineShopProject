import { PropTypes } from 'prop-types';
import { useState } from 'react';

import sortArrowDown from '../../../icons/sortArrowDown.svg';

const SortOption = (props) => {
    const { sortOption, changeSortOption } = props;

    const [isSortSelectionVisible, setIsSortSelectionVisible] = useState(false);

    let sortBy;
    if (sortOption === 'accuracy') {
        sortBy = 'Accuracy'
    } else if (sortOption === 'pricelowest') {
        sortBy = 'Price'
    } else if (sortOption === 'pricehighest') {
        sortBy = 'Price'
    }

    const handleSortSelectionItemClick = (option) => {
        changeSortOption(option);
        setIsSortSelectionVisible(false);
    }

    const sortSelectionItemsAll = [
        <p key='accuracy' onClick={()=>handleSortSelectionItemClick('accuracy')}>Accuracy</p>,
        <p key='pricelowest' onClick={()=>handleSortSelectionItemClick('pricelowest')}>Price: the lowest</p>,
        <p key='pricehighest' onClick={()=>handleSortSelectionItemClick('pricehighest')}>Price: the highest</p>,
    ]

    const handleSortBtn = () => setIsSortSelectionVisible(prev => !prev);
    
    return (
        <sort-option>
            <sort-btn onClick={handleSortBtn}>
                <p>Sort by: {sortBy}</p>
                {window.innerWidth <= 1100 && <img src={sortArrowDown} alt='show sort options' />}
            </sort-btn>
            <div className={`sort-selection-${isSortSelectionVisible ? 'visible' : 'hidden'}`}>
                {sortSelectionItemsAll.filter(item => item.key !== sortOption)}
            </div>
        </sort-option>
    );
}

SortOption.propTypes = {
    sortOption: PropTypes.string,
    changeSortOption: PropTypes.func,
}

export default SortOption;