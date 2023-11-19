import searchHistory from '../../../icons/searchHistory.svg';
import trashcan from '../../../icons/trashcan.svg';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { getAutocompleteSaved } from '../../../helpers/localStorage';

const SearchHistoryItem = ({ itemTitle, itemLink, itemId, addToSearchHistory, removeFromSearchHistory, handleCloseSearchMobile, resetSearchValue}) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        removeFromSearchHistory(itemId, getAutocompleteSaved());
        addToSearchHistory(itemId, itemTitle, itemLink, getAutocompleteSaved());
        navigate(`/search/${itemLink}`);
        window.scrollTo(0, 0);
        if (window.innerWidth < 1100) {
            handleCloseSearchMobile();
        } 
        resetSearchValue();
    }

    const handleOnClickRemove = (e) => {
        e.stopPropagation();
        removeFromSearchHistory(itemId, getAutocompleteSaved());
    }

    return (
        <search-history-item onClick={handleOnClick}>
            <span>
                <img src={searchHistory} alt='result from search history' />
                <p>{itemTitle}</p>
            </span>
            <img src={trashcan} alt='delete from search history' id='trashcan' onClick={handleOnClickRemove} />
        </search-history-item>
    );
}

SearchHistoryItem.propTypes = {
    itemTitle: PropTypes.string,
    itemLink: PropTypes.string,
    itemId: PropTypes.string,
    addToSearchHistory: PropTypes.func,
    removeFromSearchHistory: PropTypes.func,
    handleCloseSearchMobile: PropTypes.func,
    resetSearchValue: PropTypes.func,
}

export default SearchHistoryItem;