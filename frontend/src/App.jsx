import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Product from './components/Product/Product';

import StoreProvider from './store/StoreProvider';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {

    return (
        <StoreProvider>
            <Router>
                <Header />
                <Navbar />
                <content-wrapper>
                    <Routes>
                        <Route path='/' Component={Home}/>
                        <Route path='/home' Component={Home} />
                        <Route path='/product/:id' Component={Product}/>
                    </Routes>   
                </content-wrapper>
                <Footer />
            </Router>
        </StoreProvider>
    );
}

export default App;