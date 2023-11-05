import searchHistory from '../../../icons/searchHistory.svg';
import trashcan from '../../../icons/trashcan.svg';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { getAutocompleteSaved } from '../../../helpers/localStorage';

const SearchHistoryItem = ({ itemTitle, itemLink, itemId, removeFromSearchHistory, handleCloseSearchMobile}) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/search/${itemLink}`);
        window.scrollTo(0, 0);
        if (window.innerWidth < 1100) {
            handleCloseSearchMobile();
        } 
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
    removeFromSearchHistory: PropTypes.func,
    handleCloseSearchMobile: PropTypes.func,
}

export default SearchHistoryItem;