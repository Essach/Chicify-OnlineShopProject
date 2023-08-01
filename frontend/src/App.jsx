import './App.scss';
import './_variables.scss';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar'

import StoreProvider from './store/StoreProvider';

const App = () => {

    return (
        <StoreProvider>
            <Header />
            <Navbar />
        </StoreProvider>
    );
}

export default App;