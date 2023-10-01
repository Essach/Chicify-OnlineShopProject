import './SearchMobile.scss';

import closeBtn from '../../../../icons/closeBlack.svg';
import searchIcon from '../../../../icons/search.svg';

import PropTypes from 'prop-types';

const SearchMobile = (
    {
        searchValue,
        handleChangeSearchValue,
        handleSearch,
        searchHistory,
        isSearchLineVisible,
        searchPropositions,
        handleCloseSearchMobile
    }) => {

    return (
        <search-mobile>
            <close-btn>
                <img src={closeBtn} alt='close search page' onClick={handleCloseSearchMobile}/>
            </close-btn>
            <search-bar-mobile>
                <search-bar-input onKeyDown={handleSearch}>
                    <input
                        type="text"
                        placeholder='Search...'
                        value={searchValue}
                        onChange={handleChangeSearchValue} />
                </search-bar-input>
                <search-bar-btn onClick={handleSearch}>
                    <img src={searchIcon} alt='search button icon'/>
                </search-bar-btn>
            </search-bar-mobile>
            <search-results>
                {searchHistory}
                {isSearchLineVisible ? <div className='search-results-line'></div> : null}
                {searchPropositions}
            </search-results>
        </search-mobile>
    );
}

SearchMobile.propTypes = {
    searchValue: PropTypes.string,
    handleChangeSearchValue: PropTypes.func,
    handleSearch: PropTypes.func,
    searchHistory: PropTypes.array,
    isSearchLineVisible: PropTypes.bool,
    searchPropositions: PropTypes.array,
    handleCloseSearchMobile: PropTypes.func,
}

export default SearchMobile;