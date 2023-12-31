import './Login.scss';

import close from '../../icons/closeMintyBlue.svg';
import email from '../../icons/emailLogin.svg';
import lock from '../../icons/lock.svg';
import passwordShow from '../../icons/passwordShow.svg';
import passwordHide from '../../icons/passwordHide.svg';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { StoreContext } from '../../store/StoreProvider';

import request from '../../helpers/request';

import Modal from '../Modal/Modal';

import PropTypes from 'prop-types';

import { updateUser } from '../../helpers/localStorage';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase';


const Login = ({handleOnClose, isModalOpen}) => {
    const navigate = useNavigate();

    const { setUser, userInterval, languageMode } = useContext(StoreContext)

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const [emailOrPhoneNumberValue, setEmailOrPhoneNumberValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [errorText, setErrorText] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(true);

    const [loginImg, setLoginImg] = useState();

    const resetStateOfInputs = () => {
        setIsPasswordHidden(true);
        setEmailOrPhoneNumberValue('');
        setPasswordValue('')
        setErrorText('');
        setIsFormValidated(true);
    }

    const handleOnCloseModal = (e) => {
        e.preventDefault();
        handleOnClose();
    }

    const handleEmailPhoneNumberChange = (e) => setEmailOrPhoneNumberValue(e.target.value);

    const handlePasswordChange = (e) => setPasswordValue(e.target.value);

    const handleShowPasswordBtn = () => {
        setIsPasswordHidden(false)
    }

    const handleHidePasswordBtn = () => {
        setIsPasswordHidden(true);
    }

    const handleSignUpBtn = () => {
        navigate('/sign-up');
        navigate(0);
        window.scrollTo(0, 0);
    }

    const handleForgotPasswordBtn = () => {
        navigate('/password-recovery');
        navigate(0);
        window.scrollTo(0, 0);
    }

    const validateLoginForm = () => {
        if (emailOrPhoneNumberValue === '' || passwordValue === '') {
            if(languageMode === 'en') setErrorText('*Please fill in both fields');
            else setErrorText('*Proszę uzupełnić oba pola');
            setIsFormValidated(false);
            return false
        } else if (!(/@/.test(emailOrPhoneNumberValue)) && !(/^[0-9]*$/.test(emailOrPhoneNumberValue))) {
            if (languageMode === 'en') setErrorText('*Please insert an email or phone number');
            else setErrorText('*Proszę podać adres email lub number telefonu');
            setIsFormValidated(false);
            return false;
        } else if (/^[0-9]*$/.test(emailOrPhoneNumberValue) && emailOrPhoneNumberValue.length !== 9) {
            if (languageMode === 'en') setErrorText('*Please insert an email or phone number');
            else setErrorText('*Proszę podać adres email lub number telefonu');
            setIsFormValidated(false);
            return false
        }
        return true
    }

    const handleLoginButton = async (e) => {
        e.preventDefault;

        const isFormValid = validateLoginForm()
        if (isFormValid) {
            setIsFormValidated(true);

            let loginType;
            if (/@/.test(emailOrPhoneNumberValue)) {
                loginType = 'emailAddress';
            } else if (/\d/.test(emailOrPhoneNumberValue)) {
                loginType = 'phoneNumber';
            }

            const { data, status } = await request.post(
                '/users/login',
                { loginType: loginType, login: emailOrPhoneNumberValue, password: passwordValue },
            );

            if (status === 200) {
                updateUser(data.user);
                setUser(data.user);
                resetStateOfInputs();
                handleOnClose();
                userInterval.current = setInterval(() => {
                    updateUserData(loginType, emailOrPhoneNumberValue, passwordValue);
                },10000) 
            } else {
                setErrorText('*Invalid login or password');
                setIsFormValidated(false);
            }
        }
    }

    const updateUserData = async (loginType, emailOrPhoneNumberValue, passwordValue) => {
        const { data, status } = await request.post(
            '/users/login',
            { loginType: loginType, login: emailOrPhoneNumberValue, password: passwordValue },
        );

        if (status === 200) {
            updateUser(data.user);
            setUser(data.user);
        }
    } 

    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs();
        }

    },[isModalOpen])

    useEffect(() => {
        const imageRef = ref(storage, `chicifyImages/login/login.png`);
        getDownloadURL(imageRef).then((url) => {
            setLoginImg(url);
        })
    },[])

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={false} >
            <login-dialog>
                <title-and-close>
                    <p>{languageMode === 'en' ? 'Login' : 'Zaloguj się'}</p>
                    <img src={close} alt='close login form' onClick={handleOnCloseModal}/>
                </title-and-close>
                <login-image>
                    {loginImg !== undefined && <img src={loginImg} alt='login image' />}
                </login-image>
                <login-form>
                    <form-section>
                        <p>{languageMode === 'en' ? 'Email or phone number:' : 'Adres email lub numer telefonu:'}</p>
                        <input-container>
                            <img src={email} alt='letter icon' className='emailIcon'/>
                            <input
                                type="text"
                                placeholder={languageMode === 'en' ? 'Email or phone number' : 'Adres email lub numer telefonu:'}
                                value={emailOrPhoneNumberValue}
                                onChange={handleEmailPhoneNumberChange}
                            />
                        </input-container>
                    </form-section>
                    <form-section>
                        <p>{languageMode === 'en' ? 'Password:' : 'Hasło:'}</p>
                        <input-container>
                            <img src={lock} alt='lock icon' className='lockIcon'/>
                            <input
                                type={isPasswordHidden ? 'password' : 'text'}
                                placeholder={languageMode === 'en' ? 'Password:' : 'Hasło:'}
                                value={passwordValue}
                                onChange={handlePasswordChange}
                            />
                            {isPasswordHidden ? <img src={passwordShow} alt='show password' className='passwordShowIcon' onClick={handleShowPasswordBtn} /> : <img src={passwordHide} alt='hide password' className='passwordHideIcon' onClick={handleHidePasswordBtn} />
                            }
                        </input-container>
                    </form-section>
                    <additional-options>
                        <p onClick={handleSignUpBtn}>{languageMode === 'en' ? 'Sign up' : 'Zarejestruj się'}</p>
                        <p onClick={handleForgotPasswordBtn}>{languageMode === 'en' ? 'Forgot your password?' : 'Zapomniałeś hasła?'}</p>
                    </additional-options>
                </login-form>
                <validation-message>{isFormValidated ? null : <p>{errorText}</p>}</validation-message>
                <login-button onClick={handleLoginButton}><p>{languageMode === 'en' ? 'Login' : 'Zaloguj'}</p></login-button>
            </login-dialog>
        </Modal>
    );
}

Login.propTypes = {
    handleOnClose: PropTypes.func,
    isModalOpen: PropTypes.bool,
}

export default Login;