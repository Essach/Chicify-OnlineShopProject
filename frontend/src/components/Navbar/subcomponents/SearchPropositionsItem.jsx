import { useNavigate } from "react-router";

import searchIcon from '../../../icons/search.svg';

import PropTypes from 'prop-types';

const SearchPropositionItem = (props) => {
    const { name } = props;

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/search:${name}`)
        window.scrollTo(0, 0);
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
}

export default SearchPropositionItem;