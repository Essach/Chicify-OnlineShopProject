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

const Login = ({handleOnClose, isModalOpen}) => {
    const navigate = useNavigate();

    const { setUser } = useContext(StoreContext)

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const [emailOrPhoneNumberValue, setEmailOrPhoneNumberValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [errorText, setErrorText] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(true);

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

    const handleSignInBtn = () => {
        navigate('/signIn');
        navigate(0);
        window.scrollTo(0, 0);
    }

    const handleForgotPasswordBtn = () => {
        navigate('/passwordRecovery');
        navigate(0);
        window.scrollTo(0, 0);
    }

    const validateLoginForm = () => {
        if (emailOrPhoneNumberValue === '' || passwordValue === '') {
            setErrorText('*Please fill in both fields');
            setIsFormValidated(false);
            return false
        } else if (!(/@/.test(emailOrPhoneNumberValue)) && !(/\d/.test(emailOrPhoneNumberValue))) {
            console.log(!/\d/.test(emailOrPhoneNumberValue))
            console.log(!/@/.test(emailOrPhoneNumberValue))
            setErrorText('*Please insert an email or phone number');
            setIsFormValidated(false);
            return false;
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
                '/users',
                { loginType: loginType, login: emailOrPhoneNumberValue, password: passwordValue },
            );

            if (status === 200) {
                setUser(data.user)
                resetStateOfInputs();
                handleOnClose();
            } else {
                setErrorText('*Invalid login or password');
                setIsFormValidated(false);
            }
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs();
        }

    },[isModalOpen])

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={false} >
            <login-dialog>
                <title-and-close>
                    <p>Login</p>
                    <img src={close} alt='close login form' onClick={handleOnCloseModal}/>
                </title-and-close>
                <login-image>
                    <img src='http://localhost:8000/images/Login/login.png' alt='login image'/>
                </login-image>
                <login-form>
                    <form-section>
                        <p>Email or phone number:</p>
                        <input-container>
                            <img src={email} alt='letter icon' className='emailIcon'/>
                            <input
                                type="text"
                                placeholder='Email or phone number'
                                value={emailOrPhoneNumberValue}
                                onChange={handleEmailPhoneNumberChange}
                            />
                        </input-container>
                    </form-section>
                    <form-section>
                        <p>Password:</p>
                        <input-container>
                            <img src={lock} alt='lock icon' className='lockIcon'/>
                            <input
                                type={isPasswordHidden ? 'password' : 'text'}
                                placeholder='Password'
                                value={passwordValue}
                                onChange={handlePasswordChange}
                            />
                            {isPasswordHidden ? <img src={passwordShow} alt='show password' className='passwordShowIcon' onClick={handleShowPasswordBtn} /> : <img src={passwordHide} alt='hide password' className='passwordHideIcon' onClick={handleHidePasswordBtn} />
                            }
                        </input-container>
                    </form-section>
                    <additional-options>
                        <p onClick={handleSignInBtn}>Sign in</p>
                        <p onClick={handleForgotPasswordBtn}>Forgot your password?</p>
                    </additional-options>
                </login-form>
                <validation-message>{isFormValidated ? null : <p>{errorText}</p>}</validation-message>
                <login-button onClick={handleLoginButton}><p>Log in</p></login-button>
            </login-dialog>
        </Modal>
    );
}

Login.propTypes = {
    handleOnClose: PropTypes.func,
    isModalOpen: PropTypes.bool,
}

export default Login;