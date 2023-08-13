import searchIcon from '../../icons/search.svg';
import favoritesIcon from '../../icons/favorites.svg';
import notificationsIcon from '../../icons/notifications.svg';
import cartIcon from '../../icons/cart.svg';
import FAQIcon from '../../icons/FAQ.svg';
import ordersIcon from '../../icons/orders.svg';
import loginIcon from '../../icons/login.svg';
import chicifyLogo from '../../icons/logo.svg';
import menuIcon from '../../icons/menu.svg';
import closeIcon from '../../icons/close.svg';

import './Navbar.scss';

import NavButton from './subcomponents/NavButton';
import SearchHistoryItem from './subcomponents/SearchHistoryItem';

import {  useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { addToSearchHistory, getAutocompleteSaved, removeFromSearchHistory } from '../../helpers/localStorage';

import autocompleteProducts from '../../helpers/autocompleteProducts'
import SearchPropositionItem from './subcomponents/SearchPropositionsItem';

const Navbar = () => {

    const navigate = useNavigate();

    const handleOnClickLogo = () => navigate('/home');

    // mobile menu

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const handleToggleMenu = () => {
        setIsMobileMenuVisible(prev => !prev)
    }

    const handleCloseMenu = () => {
        console.log(isMobileMenuVisible)
        setIsMobileMenuVisible(false);
    }

    // Navigate buttons

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

    const navButtonsListMobile = [
        {
            id: 'favorites',
            icon: favoritesIcon,
            text: 'Favorites',    
        },
        {
            id: 'notifications',
            icon: notificationsIcon,
            text: 'Notifications',    
        },
        {
            id: 'cart',
            icon: cartIcon,
            text: 'Cart',    
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
    
    const navButtonsMobile = navButtonsListMobile.reverse().map(item => <NavButton key={item.id} name={item.id} icon={item.icon} text={item.text} />)

    // ================= Search bar ===============

    const [searchValue, setSearchValue] = useState('');

    const [isSearchLineVisible, setIsSearchLineVisible] = useState(false);

    // SEARCH HISTORY

    let autocompleteSaved = getAutocompleteSaved();

    const searchBar = useRef();

    const [searchHistory, setSearchHistory] = useState([]);

    const searchResults = useRef();
    const [areSearchResultsVisible, toggleAreSearchResultsVisible] = useState(false);


    const handleSearch = (e) => {
        if (e && e.type === "keydown") {
            if (e.key !== "Enter") {
                return;
            } else {
                searchBar.current.blur();
            }
        }
        if (searchValue !== '') {
            const id = new Date().getTime().toString();
            addToSearchHistory(id, searchValue, searchValue, autocompleteSaved);
            while (autocompleteSaved.length >= 6) {
                const id = autocompleteSaved[0].id;
                removeFromSearchHistory(id);
            }
            navigate(`/search:${searchValue}`);
        }

    }

    const handleSearchFocus = () => {
        setSearchHistory(autocompleteSaved.map(item => <SearchHistoryItem key={item.id} itemTitle={item.name} itemLink={item.link} itemId={item.id} removeFromSearchHistory={removeFromSearchHistory} />));
        if (window.innerWidth > 1050 && ( autocompleteSaved.length > 0 || searchPropositions.length >0)) {
            toggleAreSearchResultsVisible(true);
            setIsSearchLineVisible(false);
            if (autocompleteSaved.length > 0 && searchPropositions.length > 0) {
                setIsSearchLineVisible(true)
            }

        }
    }

    const handleSearchBlur = (e) => {
        e.preventDefault();
        setTimeout(() => {
            toggleAreSearchResultsVisible(false);
        }, 100)
    }

    // =========== SEARCH PROPOSITIONS ================

    const [searchPropositions, setSearchPropositions] = useState([]);

    const handleChangeSearchValue = (e) => {
        const searchValueUpdated = e.target.value;

        if (searchValueUpdated.length >= 3) {

            let keywords = autocompleteProducts.filter((keyword) => {
                return keyword.toLowerCase().includes(searchValueUpdated.toLowerCase());
            });

            if (keywords.length > 4) {
                keywords = keywords.slice(0,4);
            }

            setSearchPropositions(keywords.map(result => <SearchPropositionItem key={result} name={result} />));

            toggleAreSearchResultsVisible(true);
            
            if (autocompleteSaved.length > 0 && keywords.length > 0) {
                setIsSearchLineVisible(true);
            } else if (keywords.length === 0) {
                setIsSearchLineVisible(false);
                if (autocompleteSaved.length === 0) {
                    toggleAreSearchResultsVisible(false);
                }
            }
        }
        
        if (searchValueUpdated.length < 3) {
            setSearchPropositions([]);
            setIsSearchLineVisible(false);
            if (autocompleteSaved.length === 0) {
                toggleAreSearchResultsVisible(false);
            }
        }

        setSearchValue(searchValueUpdated);

    }

    // nav scroll behavior

    const navRef = useRef();

    const [isNavFixed, setIsNavFixed] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.innerWidth < 1100) {
                if (window.scrollY > 80) {
                    setIsNavFixed(true);
                } else setIsNavFixed(false);
            } else {
                if (window.scrollY > 120) {
                    setIsNavFixed(true);
                } else setIsNavFixed(false);
            }
        }
        )
    }, []);

    return (
        <>
            <div className={isMobileMenuVisible ? 'show-mobile-menu' : 'hide-mobile-menu'}>
                <menu-close-btn onClick={handleCloseMenu}><img src={closeIcon} alt='close menu' /></menu-close-btn>
                <menu-buttons>{navButtonsMobile}</menu-buttons>
                <div className='menu-pattern'></div>
            </div>
            <nav ref={navRef} className={isNavFixed ? 'nav-fixed': null}>
                <nav-container>
                    <menu-btn onClick={handleToggleMenu}>
                        <img src={menuIcon} alt="menu button" />
                    </menu-btn>
                    <div onClick={handleOnClickLogo} className={`nav-logo${isNavFixed ? '-shown' : '-hidden'}`}>
                        <img src={chicifyLogo} alt='Chicify Logo'/>
                        <logo-text>
                            <p id='white'>Chic</p>
                            <p id='blue'>ify</p>
                        </logo-text>
                    </div>
                    <search-bar onFocus={handleSearchFocus} onBlur={handleSearchBlur} onKeyDown={handleSearch}>
                        <search-bar-input>
                            <input
                                ref={searchBar}
                                type="text"
                                placeholder='Search...'
                                value={searchValue}
                                onChange={handleChangeSearchValue} />
                            <div ref={searchResults} className={`search-results${areSearchResultsVisible ? '' : '-hidden'}`}>
                                {searchHistory}
                                {isSearchLineVisible ? <div className='search-results-line'></div> : null}
                                {searchPropositions}
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
        </>
    );
}

export default Navbar;