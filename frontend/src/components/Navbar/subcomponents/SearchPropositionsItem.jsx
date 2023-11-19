import { useNavigate } from "react-router";

import searchIcon from '../../../icons/search.svg';

import PropTypes from 'prop-types';

import { addToSearchHistory, removeFromSearchHistory, getAutocompleteSaved } from "../../../helpers/localStorage";

const SearchPropositionItem = (props) => {
    const { name, handleCloseSearchMobile, resetSearchValue } = props;

    const navigate = useNavigate();

    const handleOnClick = () => {
        const autocompleteSaved = getAutocompleteSaved();
        const id = new Date().getTime().toString();
        addToSearchHistory(id, name, name, autocompleteSaved);
        if (autocompleteSaved.length >= 4) {
            const id = autocompleteSaved[0].id;
            removeFromSearchHistory(id, getAutocompleteSaved());
        }
        
        navigate(`/search/${name}`)
        window.scrollTo(0, 0);
        if (window.innerWidth < 1100) {
            handleCloseSearchMobile();
        }
        resetSearchValue()
    }

    return (
        <search-propositions-item onClick={handleOnClick}>
            <img src={searchIcon} alt={name} />
            <p>{name}</p>
        </search-propositions-item>
    );
}

SearchPropositionItem.propTypes = {
    name: PropTypes.string,
    handleCloseSearchMobile: PropTypes.func,
    resetSearchValue: PropTypes.func,
}

export default SearchPropositionItem;