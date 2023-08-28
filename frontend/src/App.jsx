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
                        </Routes>
                    </content-wrapper>
                </CartProvider>
                <Footer />
            </Router>
        </StoreProvider>
    );
}

export default App;