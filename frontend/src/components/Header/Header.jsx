import { useNavigate } from 'react-router';
import chicifyLogo from '../../icons/logo.svg'
import './Header.scss'
import { useContext, useState } from 'react';

import { StoreContext } from '../../store/StoreProvider';
import Login from '../Login/Login';

const Header = () => {
    const navigate = useNavigate()

    const { user } = useContext(StoreContext);

    const handleOnClickLogo = () => {
        navigate('/home');
        window.scrollTo(0, 0);
    }

    const handleStartSellingBtn = () => {
        if (user) {
            navigate('/selling-sign-in');
            window.scrollTo(0, 0);
        } else {
            setIsModalOpenLogin(true);
        }
    }

    const handleMyProductsBtn = () => {
        navigate('/my-products');
        window.scrollTo(0, 0);
    }

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const handleOnCloseLogin = () => {
        setIsModalOpenLogin(false);
    }

    return (
        <header>
            <header-container>
                <header-logo onClick={handleOnClickLogo}>
                    <img src={chicifyLogo} alt='Chicify Logo'/>
                    <logo-text>
                        <p id='white'>Chic</p>
                        <p id='blue'>ify</p>
                    </logo-text>
                </header-logo>
                <seller-btns>
                    {user !== undefined && user.accessLevel >= 2 ?
                        <my-products-btn onClick={handleMyProductsBtn}>
                            <p>
                                My products
                            </p>
                        </my-products-btn> :
                        <start-selling-btn onClick={handleStartSellingBtn}>
                            <p>
                                Start selling
                            </p>
                        </start-selling-btn>
                    }
                    <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
                </seller-btns>
            </header-container>
        </header>
    );
}


export default Header;