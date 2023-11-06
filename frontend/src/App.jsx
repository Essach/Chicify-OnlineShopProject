import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import ProductPage from './components/ProductPage/ProductPage';

import StoreProvider from './store/StoreProvider';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CartProvider from './context/CartContext';
import SignIn from './components/SignIn/SignIn';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';
import Faq from './components/Faq/Faq';
import Notifications from './components/Notifications/Notifications';
import Favorites from './components/Favorites/Favorites';
import SearchResults from './components/SearchResults/SearchResults';

const App = () => {

    return (
        <StoreProvider>
            <Router>
                <Header />
                <Navbar />
                <CartProvider>
                    <content-wrapper>
                        <Routes>
                            <Route path='/' Component={Home} />
                            <Route path='/home' Component={Home} />
                            <Route path='/product/:id' Component={ProductPage} />
                            <Route path='/signin' Component={SignIn} />
                            <Route path='/terms-and-conditions' Component={TermsAndConditions} />
                            <Route path='/password-recovery' Component={PasswordRecovery} />
                            <Route path='/cart' Component={Cart} />
                            <Route path='/orders' Component={Orders} />
                            <Route path='/faq' Component={Faq} />
                            <Route path='/notifications/:id' Component={Notifications}/>
                            <Route path='/notifications' Component={Notifications}/>
                            <Route path='/favorites' Component={Favorites} />
                            <Route path='/search/:item' Component={SearchResults}/>
                            <Route path='/search/' Component={SearchResults}/>
                        </Routes>
                    </content-wrapper>
                </CartProvider>
                <Footer />
            </Router>
        </StoreProvider>
    );
}

export default App;