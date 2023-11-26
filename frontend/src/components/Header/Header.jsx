import { useNavigate } from 'react-router';
import chicifyLogo from '../../icons/logo.svg'
import './Header.scss'
import { useContext, useEffect, useState } from 'react';

import { StoreContext } from '../../store/StoreProvider';
import Login from '../Login/Login';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase';
import { getLanguageMode, toggleLanguageMode } from '../../helpers/localStorage';

const Header = () => {
    const navigate = useNavigate()

    const { user, languageMode } = useContext(StoreContext);

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

    const [polandFlag, setPolandFlag] = useState('')
    const [ukFlag, setUkFlag] = useState('')

    const [isToggleEn, setIsToggleEn] = useState(false);
    const handleToggleLanguageMode = () => {
        setIsToggleEn(prev => !prev);
        toggleLanguageMode();
        navigate(0)
    }

    useEffect(() => {
        const polandRef = ref(storage, 'chicifyImages/toggleFlags/poland.jpg');
        const ukRef = ref(storage, 'chicifyImages/toggleFlags/uk.png');
        getDownloadURL(polandRef).then((url) => {
            setPolandFlag(url);
        })
        getDownloadURL(ukRef).then((url) => {
            setUkFlag(url)
        })

        if (getLanguageMode() === 'en') setIsToggleEn(true);
        else setIsToggleEn(false);
    },[])

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
                <header-right>
                    <seller-btns>
                        {user !== undefined && user.accessLevel >= 2 ?
                            <my-products-btn onClick={handleMyProductsBtn}>
                                <p>
                                    {languageMode === 'en' ? 'My products' : 'Moje produkty'}
                                </p>
                            </my-products-btn> :
                            <start-selling-btn onClick={handleStartSellingBtn}>
                                <p>
                                    {languageMode === 'en' ? 'Start selling' : 'Zacznij sprzedawać'}
                                </p>
                            </start-selling-btn>
                        }
                        <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
                    </seller-btns>
                    <language-select>
                        <p>{languageMode === 'en' ? 'Currently used language' : 'Obecnie używany język'}</p>
                        <div className={`language-toggle ${getLanguageMode() ? 'active' : ''}`} onClick={handleToggleLanguageMode}>
                            <toggle-text-pl>
                                PL
                            </toggle-text-pl>
                            <div className={`toggle-btn ${isToggleEn ? 'active' : ''}`}>
                                {polandFlag !== '' && ukFlag !== '' ?
                                    <img src={isToggleEn ? ukFlag : polandFlag} alt={isToggleEn ? 'the uk flag' : 'poland flag'} /> : null}
                            </div>
                            <toggle-text-en>
                                EN
                            </toggle-text-en>
                        </div>
                    </language-select>
                </header-right>
            </header-container>
        </header>
    );
}


export default Header;