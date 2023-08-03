import './App.scss';
import './_variables.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar'

import StoreProvider from './store/StoreProvider';

import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {

    return (
        <Router>
            <StoreProvider>
                <Header />
                <Navbar />
                <Footer />
            </StoreProvider>
        </Router>
    );
}

export default App;