import { useParams } from 'react-router';
import './SearchResults.scss';
import SearchResultsBottom from './subcomponents/SearchResultsBottom/SearchResultsBottom';
import { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';

const SearchResults = () => {
    const { item } = useParams()

    const { languageMode } = useContext(StoreContext);

    return (
        <search-results-page>
            <sr-top>
                {languageMode === 'en' ? `Results for ${item}` : `Wyniki dla ${item}`}
            </sr-top>
            <SearchResultsBottom itemName={item !== undefined ? item : ''} />
        </search-results-page>
    );
}

export default SearchResults;