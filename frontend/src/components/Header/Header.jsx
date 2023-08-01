import { useNavigate } from 'react-router';
import chicifyLogo from '../../icons/logo.svg'
import './Header.scss'

const Header = () => {
    const navigate = useNavigate()

    const handleOnClickLogo = () => navigate('/home');

    const handleStartSellingBtn = () => navigate('/selling-sign-in');

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
                <start-selling-btn onClick={handleStartSellingBtn}>
                <p>
                    Start selling
                </p>
                </start-selling-btn>
            </header-container>
        </header>
    );
}


export default Header;