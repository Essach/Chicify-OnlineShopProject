import searchIcon from '../../icons/search.svg';
import favoritesIcon from '../../icons/favorites.svg';
import notificationsIcon from '../../icons/notifications.svg';
import cartIcon from '../../icons/cart.svg';
import FAQIcon from '../../icons/FAQ.svg';
import ordersIcon from '../../icons/orders.svg';
import loginIcon from '../../icons/login.svg';

import './Navbar.scss';

import NavButton from './subcomponents/NavButton';
import SearchHistoryItem from './subcomponents/SearchHistoryItem';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navButtonsList = [
        {
            id: 'favorites',
            icon: favoritesIcon,
            text: '',    
        },
        {
            id: 'notifications',
            icon: notificationsIcon,
            text: '',    
        },
        {
            id: 'cart',
            icon: cartIcon,
            text: '',    
        },
        {
            id: 'faq',
            icon: FAQIcon,
            text: 'Help',    
        },
        {
            id: 'orders',
            icon: ordersIcon,
            text: 'Orders',    
        },
        {
            id: 'login',
            icon: loginIcon,
            text: 'Log in',    
        },
    ]

    const navButtons = navButtonsList.map(item => <NavButton key={item.id} name={item.id} icon={item.icon} text={item.text} />)
    
    // Search bar

    let autocompleteSaved = localStorage.getItem("autocompleteSaved")?JSON.parse(localStorage.getItem("autocompleteSaved")):[];

    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate()

    const handleChangeSearchValue = (e) => setSearchValue(e.target.value);

    const handleSearch = () => {
        if (searchValue !== '') {
            const id = new Date().getTime().toString();
            addToSearchHistory(id, searchValue, searchValue);
            while (autocompleteSaved.length >= 6) {
                const id = autocompleteSaved[0].id;
                removeFromSearchHistory(id);
            }
            navigate(`/search:${searchValue}`);
        }
    }

    // =========== Search bar autocomplete ===============
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchPropositions, setSearchPropositions] = useState([])

    const searchResults = useRef();
    const [areSearchResultsVisible, toggleAreSearchResultsVisible] = useState(false);

    const addToSearchHistory = (id,name,link) => {
        const searchResult = {id,name,link};
        autocompleteSaved.push(searchResult);
        localStorage.setItem("autocompleteSaved", JSON.stringify(autocompleteSaved));
        
    }

    const removeFromSearchHistory = (id) => {
        autocompleteSaved = autocompleteSaved.filter(item => item.id !== id);
        localStorage.setItem('autocompleteSaved', JSON.stringify(autocompleteSaved));
    }

    // const getLocalStorage = () => {
    //     return localStorage.getItem("autocompleteSaved")?JSON.parse(localStorage.getItem("autocompleteSaved")):[];
    // }    

    const handleSearchFocus = () => {
        setSearchHistory(autocompleteSaved.map(item => <SearchHistoryItem key={item.id} itemTitle={item.name} itemLink={item.link} itemId={item.id} removeFromSearchHistory={removeFromSearchHistory} />));
        if (window.innerWidth > 500) {
            toggleAreSearchResultsVisible(true);
        }
    }

    const handleSearchBlur = () => {
        setTimeout(() => {
            toggleAreSearchResultsVisible(false);
        }, 100)
    }

    // useEffect(() => {        
    //     if (autocompleteSaved.length > 0) {
    //         setSearchHistory(prev => autocompleteSaved.map(item => <SearchHistoryItem key={item.id} itemTitle={item.name} itemLink={item.link} />))
    //     }

    // }, [])

    return (
        <nav>
            <nav-container>
                <search-bar onFocus={handleSearchFocus} onBlur={handleSearchBlur}>
                    <search-bar-input>
                        <input type="text" placeholder='Search...' value={searchValue} onChange={handleChangeSearchValue}/>
                        <div ref={searchResults} className={`search-results${areSearchResultsVisible ? '' : '-hidden'}`}>
                            {searchHistory}
                        </div>
                    </search-bar-input>
                    <search-bar-btn onClick={handleSearch}>
                        <img src={searchIcon} alt='search button icon'/>
                    </search-bar-btn>
                </search-bar>
                <nav-buttons>
                    {navButtons}
                </nav-buttons>
            </nav-container>
        </nav>
    );
}

export default Navbar;