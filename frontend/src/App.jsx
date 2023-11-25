import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import ProductPage from './components/ProductPage/ProductPage';

import StoreProvider from './store/StoreProvider';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CartProvider from './context/CartContext';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';
import Faq from './components/Faq/Faq';
import Notifications from './components/Notifications/Notifications';
import Favorites from './components/Favorites/Favorites';
import SearchResults from './components/SearchResults/SearchResults';
import StartSelling from './components/StartSelling/StartSelling';
import MyProducts from './components/MyProducts/MyProducts';
import SignUp from './components/SignUp/SignUp';
// import Test from './Test';

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
                            <Route path='/sign-up' Component={SignUp} />
                            <Route path='/terms-and-conditions' Component={TermsAndConditions} />
                            <Route path='/password-recovery' Component={PasswordRecovery} />
                            <Route path='/cart' Component={Cart} />
                            <Route path='/orders' Component={Orders} />
                            <Route path='/faq' Component={Faq} />
                            <Route path='/notifications/:id' Component={Notifications}/>
                            <Route path='/notifications' Component={Notifications}/>
                            <Route path='/favorites' Component={Favorites} />
                            <Route path='/search/:item' Component={SearchResults}/>
                            <Route path='/search/' Component={SearchResults} />
                            <Route path='/selling-sign-in' Component={StartSelling} />
                            <Route path='/my-products' Component={MyProducts} />
                            {/* <Route path='/test' Component={Test} /> */}
                            
                        </Routes>
                    </content-wrapper>
                </CartProvider>
                <Footer />
            </Router>
        </StoreProvider>
    );
}

export default App;