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
import SearchMobile from './subcomponents/SearchMobile/SearchMobile';


import {  useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { addToSearchHistory, getAutocompleteSaved, removeFromSearchHistory } from '../../helpers/localStorage';

import autocompleteProducts from '../../helpers/autocompleteProducts'
import SearchPropositionItem from './subcomponents/SearchPropositionsItem';

import { StoreContext } from '../../store/StoreProvider';

import Login from '../Login/Login';

import { logoutUser } from '../../helpers/localStorage';
import NotificationWindow from './subcomponents/Notification/NotificationWindow/NotificationWindow';


const Navbar = () => {

    const navigate = useNavigate();

    const handleOnClickLogo = () => {
        navigate('/home');
        navigate(0);
        window.scrollTo(0, 0);
    }

    // mobile menu

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const handleToggleMenu = () => {
        setIsMobileMenuVisible(prev => !prev)
    }

    const handleCloseMenu = () => {
        setIsMobileMenuVisible(false);
    }

    // Navigate buttons

    const { user, setUser } = useContext(StoreContext);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigateFunction = (url) => {
        navigate(`/${url}`);
        window.scrollTo(0, 0);
    }

    const handleOnClickFavorites = () => {
        navigateFunction('favorites');
        if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
    }

    const handleOnClickNotifications = () => {
        navigateFunction('home');
    }

    const handleOnClickCart = () => {
        navigateFunction('cart');
        if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
    }

    const handleOnClickHelp = () => {
        navigateFunction('faq');
        if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
    }

    const handleOnClickOrders = () => {
        navigateFunction('orders');
        if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
    }

    const handleOnCloseLogin = () => setIsModalOpen(false)
    const handleOnClickLogin = () => {
        if (user) {
            setUser(undefined);
            logoutUser();
            navigateFunction('home');
            navigate(0);
        } else {
            setIsModalOpen(true);
            if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
        }
    }

    const navButtonsList = [
        {
            id: 'favorites',
            icon: favoritesIcon,
            text: '',
            handleOnClick: handleOnClickFavorites,
        },
        {
            id: 'cart',
            icon: cartIcon,
            text: '',
            handleOnClick: handleOnClickCart,
        },
        {
            id: 'faq',
            icon: FAQIcon,
            text: 'Help',
            handleOnClick: handleOnClickHelp,
        },
        {
            id: 'orders',
            icon: ordersIcon,
            text: 'Orders',
            handleOnClick: handleOnClickOrders,
        },
        {
            id: 'login',
            icon: loginIcon,
            text: user ? 'Log out' : 'Log in',
            handleOnClick: handleOnClickLogin,
        },
    ]

    // {
    //     id: 'notifications',
    //     icon: notificationsIcon,
    //     text: '',   
    //     handleOnClick: handleOnClickNotifications
    // },

    const navButtonsListMobile = [
        {
            id: 'favorites',
            icon: favoritesIcon,
            text: 'Favorites',    
            handleOnClick: handleOnClickFavorites,
        },
        {
            id: 'notifications',
            icon: notificationsIcon,
            text: 'Notifications', 
            handleOnClick: handleOnClickNotifications
        },
        {
            id: 'cart',
            icon: cartIcon,
            text: 'Cart',    
            handleOnClick: handleOnClickCart,
        },
        {
            id: 'faq',
            icon: FAQIcon,
            text: 'Help',    
            handleOnClick: handleOnClickHelp,
        },
        {
            id: 'orders',
            icon: ordersIcon,
            text: 'Orders',   
            handleOnClick: handleOnClickOrders,
        },
        {
            id: 'login',
            icon: loginIcon,
            text: user ? 'Log out' : 'Log in',   
            handleOnClick: handleOnClickLogin,
        },
    ]

    const navButtons = navButtonsList.map(item => <NavButton key={item.id} name={item.id} icon={item.icon} text={item.text} handleOnClick={item.handleOnClick} />)
    
    const navButtonsMobile = navButtonsListMobile.reverse().map(item => <NavButton key={item.id} name={item.id} icon={item.icon} text={item.text} handleOnClick={item.handleOnClick} />)

    // ================= Search bar ===============

    const [searchValue, setSearchValue] = useState('');

    const [isSearchLineVisible, setIsSearchLineVisible] = useState(false);

    const [isSearchMobileVisible, setIsSearchMobileVisible] = useState(false);

    const handleCloseSearchMobile = () => setIsSearchMobileVisible(false);

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
            window.scrollTo(0, 0);
        }

    }

    const handleSearchFocus = () => {
        setSearchHistory(autocompleteSaved.map(item => <SearchHistoryItem key={item.id} itemTitle={item.name} itemLink={item.link} itemId={item.id} removeFromSearchHistory={removeFromSearchHistory} handleCloseSearchMobile={handleCloseSearchMobile}/>));
        if (window.innerWidth > 1100 && ( autocompleteSaved.length > 0 || searchPropositions.length >0)) {
            toggleAreSearchResultsVisible(true);
            setIsSearchLineVisible(false);
            if (autocompleteSaved.length > 0 && searchPropositions.length > 0) {
                setIsSearchLineVisible(true)
            }
        }
        else if (window.innerWidth <= 1100) {
            setIsSearchMobileVisible(true)
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

            setSearchPropositions(keywords.map(result => <SearchPropositionItem key={result} name={result} handleCloseSearchMobile={handleCloseSearchMobile}/>));

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
                if (window.scrollY > 80 && isSearchMobileVisible === false) {
                    setIsNavFixed(true);
                } else setIsNavFixed(false);
            } else {
                if (window.scrollY > 120) {
                    setIsNavFixed(true);
                } else setIsNavFixed(false);
            }
        }
        )
    }, [isSearchMobileVisible]);

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
                    {isSearchMobileVisible && <SearchMobile
                        searchValue={searchValue}
                        handleChangeSearchValue={handleChangeSearchValue}
                        handleSearch={handleSearch}
                        searchHistory={searchHistory}
                        isSearchLineVisible={isSearchLineVisible}
                        searchPropositions={searchPropositions}
                        handleCloseSearchMobile={handleCloseSearchMobile}
                    />
                    }
                    <nav-buttons>
                        <NotificationWindow />
                        {navButtons}
                    </nav-buttons>
                    <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpen} />
                </nav-container>
            </nav>
        </>
    );
}

export default Navbar;