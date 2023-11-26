import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';

import sortArrowDown from '../../../icons/sortArrowDown.svg';
import { StoreContext } from '../../../store/StoreProvider';

const SortOption = (props) => {
    const { sortOption, changeSortOption } = props;

    const { languageMode } = useContext(StoreContext);

    const [isSortSelectionVisible, setIsSortSelectionVisible] = useState(false);

    let sortBy;
    if (sortOption === 'accuracy') {
        if(languageMode === 'en') sortBy = 'Accuracy'
        else sortBy = 'Trafność'
    } else if (sortOption === 'pricelowest') {
        if (languageMode === 'en') sortBy = 'Price'
        else sortBy = 'Cena'
    } else if (sortOption === 'pricehighest') {
        if (languageMode === 'en') sortBy = 'Price'
        else sortBy = 'Cena'
    }

    const handleSortSelectionItemClick = (option) => {
        changeSortOption(option);
        setIsSortSelectionVisible(false);
    }

    const sortSelectionItemsAll = [
        <p key='accuracy' onClick={() => handleSortSelectionItemClick('accuracy')}>{languageMode === 'en' ? 'Accuracy' : 'Trafność'}</p>,
        <p key='pricelowest' onClick={() => handleSortSelectionItemClick('pricelowest')}>{languageMode === 'en' ? 'Price: the lowest' : 'Cena: od najniższej'}</p>,
        <p key='pricehighest' onClick={() => handleSortSelectionItemClick('pricehighest')}>{languageMode === 'en' ? 'Price: the highest' : 'Cena: od najwyższej'}</p>,
    ]

    const handleSortBtn = () => setIsSortSelectionVisible(prev => !prev);
    
    return (
        <sort-option>
            <sort-btn onClick={handleSortBtn}>
                <p>{languageMode === 'en' ? 'Sort by:' : 'Sortuj według:'} {sortBy}</p>
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