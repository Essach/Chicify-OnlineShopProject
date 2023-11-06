import { useParams } from 'react-router';
import './SearchResults.scss';
import SearchResultsBottom from './subcomponents/SearchResultsBottom/SearchResultsBottom';

const SearchResults = () => {
    const { item } = useParams()
    
    return (
        <search-results-page>
            <sr-top>
                Results for {item}
            </sr-top>
            <SearchResultsBottom itemName={item !== undefined ? item : ''} />
        </search-results-page>
    );
}

export default SearchResults;