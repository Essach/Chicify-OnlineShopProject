import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/home';

import StoreProvider from './store/StoreProvider';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {

    return (
        <Router>
            <StoreProvider>
                <Header />
                <Navbar />
                <content-wrapper>
                    <Routes>
                        <Route path='/' Component={Home}/>
                        <Route path='/home' Component={Home}/>
                    </Routes>   
                </content-wrapper>
                <Footer />
            </StoreProvider>
        </Router>
    );
}

export default App;