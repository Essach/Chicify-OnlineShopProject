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
import NotificationModal from './subcomponents/Notification/NotificationModal/NotificationModal';
import { logoutAuth } from '../../helpers/firebaseAuth';


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

    const { user, setUser, userInterval, languageMode } = useContext(StoreContext);

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false)

    const [isModalOpenNotifications, setIsModalOpenNotifications] = useState(false)

    const handleOnCloseNotificationsMobile = () => setIsModalOpenNotifications(false);

    const handleOnCloseLogin = () => setIsModalOpenLogin(false);

    const [navButtons, setNavButtons] = useState([])
    const [navButtonsMobile, setNavButtonsMobile] = useState([])

    // ================= Search bar ===============

    const [searchValue, setSearchValue] = useState('');

    const [isSearchLineVisible, setIsSearchLineVisible] = useState(false);

    const [isSearchMobileVisible, setIsSearchMobileVisible] = useState(false);
    
    const searchMobileInputRef = useRef(null);

    const handleCloseSearchMobile = () => setIsSearchMobileVisible(false);

    // SEARCH HISTORY

    let autocompleteSaved = getAutocompleteSaved();

    const searchBar = useRef();

    const [searchHistory, setSearchHistory] = useState([]);

    const searchResults = useRef();
    const [areSearchResultsVisible, setAreSearchResultsVisible] = useState(false);


    const handleSearch = (e) => {
        if (e && e.type === "keydown") {
            if (e.key !== "Enter") {
                return;
            } else {
                searchBar.current.blur();
                handleCloseSearchMobile();
            }
        }
        if (searchValue !== '') {
            const id = new Date().getTime().toString();
            addToSearchHistory(id, searchValue, searchValue, autocompleteSaved);
            if (autocompleteSaved.length >= 4) {
                const id = autocompleteSaved[0].id;
                removeFromSearchHistory(id, autocompleteSaved);
            }
            navigate(`/search/${searchValue}`);
            window.scrollTo(0, 0);
            setSearchValue('');
            
            handleCloseSearchMobile();
        }

    }

    const handleSearchFocus = () => {
        setSearchHistory(autocompleteSaved.slice().reverse().map(item => <SearchHistoryItem key={item.id} itemTitle={item.name} itemLink={item.link} itemId={item.id} addToSearchHistory={addToSearchHistory} removeFromSearchHistory={removeFromSearchHistory} handleCloseSearchMobile={handleCloseSearchMobile} resetSearchValue={()=>{setSearchValue('')}} />));
        if (window.innerWidth > 1100 && ( autocompleteSaved.length > 0 || searchPropositions.length >0)) {
            setAreSearchResultsVisible(true);
            setIsSearchLineVisible(false);
            if (autocompleteSaved.length > 0 && searchPropositions.length > 0) {
                setIsSearchLineVisible(true)
            }
        }
        else if (window.innerWidth <= 1100) {
            setIsSearchMobileVisible(true)
            if (searchMobileInputRef.current) searchMobileInputRef.current.focus();
        }
    }

    const handleSearchBlur = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setAreSearchResultsVisible(false);
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

            setSearchPropositions(keywords.map(result => <SearchPropositionItem key={result} name={result} handleCloseSearchMobile={handleCloseSearchMobile} resetSearchValue={()=>{setSearchValue('')}} />));

            setAreSearchResultsVisible(true);
            
            if (autocompleteSaved.length > 0 && keywords.length > 0) {
                setIsSearchLineVisible(true);
            } else if (keywords.length === 0) {
                setIsSearchLineVisible(false);
                if (autocompleteSaved.length === 0) {
                    setAreSearchResultsVisible(false);
                }
            }
        }
        
        if (searchValueUpdated.length < 3) {
            setSearchPropositions([]);
            setIsSearchLineVisible(false);
            if (autocompleteSaved.length === 0) {
                setAreSearchResultsVisible(false);
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

    useEffect(() => {
        const navigateFunction = (url) => {
            navigate(`/${url}`);
            window.scrollTo(0, 0);
        }

        const handleOnClickFavorites = () => {
            navigateFunction('favorites');
            if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
        }

        const handleOnClickNotificationsMobile = () => {
            if (user) {
                setIsModalOpenNotifications(true);
            } else {
                setIsModalOpenLogin(true);
            }
            setIsMobileMenuVisible(false);
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

        const handleOnClickLogin = () => {
            if (user) {
                setUser(undefined);
                logoutUser();
                logoutAuth();
                navigateFunction('home');
                navigate(0);
                clearInterval(userInterval.current)
            } else {
                setIsModalOpenLogin(true);
                if (window.innerWidth < 1100) setIsMobileMenuVisible(false);
            }
        }

        let navButtonsList = [];
        let navButtonsListMobile = [];
        if (languageMode === 'en') {
            navButtonsList = [
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
            navButtonsListMobile = [
                {
                    id: 'notifications',
                    icon: notificationsIcon,
                    text: 'Notifications', 
                    handleOnClick: handleOnClickNotificationsMobile
                },
                {
                    id: 'favorites',
                    icon: favoritesIcon,
                    text: 'Favorites',    
                    handleOnClick: handleOnClickFavorites,
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
        } else {
            navButtonsList = [
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
                    text: 'Pomoc',
                    handleOnClick: handleOnClickHelp,
                },
                {
                    id: 'orders',
                    icon: ordersIcon,
                    text: 'Zamówienia',
                    handleOnClick: handleOnClickOrders,
                },
                {
                    id: 'login',
                    icon: loginIcon,
                    text: user ? 'Wyloguj się' : 'Zaloguj się',
                    handleOnClick: handleOnClickLogin,
                },
            ]
            navButtonsListMobile = [
                {
                    id: 'notifications',
                    icon: notificationsIcon,
                    text: 'Powiadomienia', 
                    handleOnClick: handleOnClickNotificationsMobile
                },
                {
                    id: 'favorites',
                    icon: favoritesIcon,
                    text: 'Ulubione',    
                    handleOnClick: handleOnClickFavorites,
                },
                {
                    id: 'cart',
                    icon: cartIcon,
                    text: 'Koszyk',    
                    handleOnClick: handleOnClickCart,
                },
                {
                    id: 'faq',
                    icon: FAQIcon,
                    text: 'Pomoc',    
                    handleOnClick: handleOnClickHelp,
                },
                {
                    id: 'orders',
                    icon: ordersIcon,
                    text: 'Zamówienia',   
                    handleOnClick: handleOnClickOrders,
                },
                {
                    id: 'login',
                    icon: loginIcon,
                    text: user ? 'Wyloguj się' : 'Zaloguj się',   
                    handleOnClick: handleOnClickLogin,
                },
            ]
        }
        setNavButtons(navButtonsList.map(item => <NavButton key={item.id} name={item.id} icon={item.icon} text={item.text} handleOnClick={item.handleOnClick} />))
        setNavButtonsMobile(navButtonsListMobile.reverse().map(item => <NavButton key={item.id} name={item.id} icon={item.icon} text={item.text} handleOnClick={item.handleOnClick} />))

    }, [languageMode, user, navigate, setUser, userInterval])

    useEffect(() => {
        const resizeFunc = () => {
            setIsSearchMobileVisible(false);
            setIsMobileMenuVisible(false);
            setAreSearchResultsVisible(false);
            searchBar.current.blur();
        }

        window.addEventListener('resize', resizeFunc);

        return () => {
            window.removeEventListener('resize', resizeFunc);
        }
    },[])

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
                                placeholder={languageMode === 'en' ? 'Search...' : 'Szukaj...'}
                                value={searchValue}
                                onChange={handleChangeSearchValue} />
                            {window.innerWidth > 1100 ?
                            <div ref={searchResults} className={`search-results${areSearchResultsVisible ? '' : '-hidden'}`}>
                                {searchHistory}
                                {isSearchLineVisible ? <div className='search-results-line'></div> : null}
                                {searchPropositions}
                            </div> : null}
                        </search-bar-input>
                        <search-bar-btn onClick={handleSearch}>
                            <img src={searchIcon} alt='search button icon'/>
                        </search-bar-btn>
                    </search-bar>
                    <SearchMobile
                        searchValue={searchValue}
                        handleChangeSearchValue={handleChangeSearchValue}
                        handleSearch={handleSearch}
                        searchHistory={searchHistory}
                        isSearchLineVisible={isSearchLineVisible}
                        searchPropositions={searchPropositions}
                        handleCloseSearchMobile={handleCloseSearchMobile}
                        isSearchMobileVisible={isSearchMobileVisible}
                        ref={searchMobileInputRef}
                    />
                    <nav-buttons>
                        <NotificationWindow openLoginModal={setIsModalOpenLogin} />
                        {navButtons}
                    </nav-buttons>
                    <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
                    <NotificationModal handleOnClose={handleOnCloseNotificationsMobile} isModalOpen={isModalOpenNotifications} />
                </nav-container>
            </nav>
        </>
    );
}

export default Navbar;