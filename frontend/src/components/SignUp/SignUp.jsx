import './SignUp.scss';

import close from '../../icons/closeMintyBlue.svg';
import email from '../../icons/emailLogin.svg';
import lock from '../../icons/lock.svg';
import passwordShow from '../../icons/passwordShow.svg';
import passwordHide from '../../icons/passwordHide.svg';
import user from '../../icons/userSignup.svg';

import { useContext, useEffect, useState } from 'react';

import request from '../../helpers/request';

import { useNavigate } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';

const SignUp = () => {
    const navigate = useNavigate()

    const { languageMode } = useContext(StoreContext);

    const [userEmails, setUserEmails] = useState();
    const [userPhoneNumbers, setUserPhoneNumbers] = useState();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isFormValidated, setIsFormValidated] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [ usernameValue, setUsernameValue] = useState('');
    const [ emailOrPhoneNumberValue, setEmailOrPhoneNumberValue] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ repeatPasswordValue, setRepeatPasswordValue ] = useState('');
    const [ agreementValue, setAgreementValue ] = useState(false)

    const handleUsernameChange = (e) => setUsernameValue(e.target.value);
    const handleEmailOrPhoneNumberChange = (e) => setEmailOrPhoneNumberValue(e.target.value);
    const handlePasswordChange = (e) => setPasswordValue(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPasswordValue(e.target.value);
    const handleAgreementChange = () => setAgreementValue(prev => !prev)

    const handlePasswordShow = () => setIsPasswordHidden(prev => !prev)

    const handleClose = () => {
        navigate('/home');
        window.scrollTo(0,0)
    }

    const validateSignInForm = () => {
        if (usernameValue === '' || emailOrPhoneNumberValue === '' || passwordValue === '' || repeatPasswordValue === '') {
            if (languageMode === 'en') setErrorText('*Please fill in all fields');
            else setErrorText('*Proszę uzupełnic wszystkie pola');
            setIsFormValidated(false);
            return false
        } else if (agreementValue === false) {
            if (languageMode === 'en') setErrorText('*You have to agree to terms & conditions to proceed');
            else setErrorText('*Musisz wyrazić zgodę na warunki użytkowania');
            setIsFormValidated(false);
            return false
        } else if (!(/@/.test(emailOrPhoneNumberValue)) && !(/^[0-9]*$/.test(emailOrPhoneNumberValue))) {
            if (languageMode === 'en') setErrorText('*Please insert an email or phone number');
            else setErrorText('*Proszę podać adres email lub number telefonu');
            setIsFormValidated(false);
            return false
        } else if (/^[0-9]*$/.test(emailOrPhoneNumberValue) && emailOrPhoneNumberValue.length !== 9) {
            if (languageMode === 'en') setErrorText('*Please insert an email or phone number');
            else setErrorText('*Proszę podać adres email lub number telefonu');
            setIsFormValidated(false);
            return false
        } else if (repeatPasswordValue !== passwordValue) {
            if (languageMode === 'en') setErrorText("*Passwords don't match");
            else setErrorText("*Hasła się nie zgadzają");
            setIsFormValidated(false);
            return false
        } else if (userEmails === undefined || userPhoneNumbers === undefined) {
            if (languageMode === 'en') setErrorText('*Internal server error 2');
            else setErrorText('*Wewnętrzny błąd serwera');
            setIsFormValidated(false);
            return false
        } else if (userEmails.find(email => email === emailOrPhoneNumberValue) !== undefined) {
            if (languageMode === 'en') setErrorText('*Email already in use');
            else setErrorText('*Email jest już w użyciu');
            setIsFormValidated(false);
            return false
        } else if (userPhoneNumbers.find(phoneNum => phoneNum === emailOrPhoneNumberValue) !== undefined) {
            if (languageMode === 'en') setErrorText('*Phone number already in use');
            else setErrorText('*Numer telefonu jest już w użyciu');
            setIsFormValidated(false);
            return false
        }
        return true
    }

    const handleCreateAccountButton = async (e) => {
        e.preventDefault;

        const isFormValid = validateSignInForm();
        if (isFormValid) {
            setIsFormValidated(true);

            let createType;
            if (/@/.test(emailOrPhoneNumberValue)) {
                createType = 'emailAddress';
            } else if (/\d/.test(emailOrPhoneNumberValue)) {
                createType = 'phoneNumber';
            }

            const newAccountInfo = createType === 'emailAddress' ? {
                username: usernameValue,
                phoneNumber: '',
                emailAddress: emailOrPhoneNumberValue,
                password: passwordValue,
            } : {
                username: usernameValue,
                phoneNumber: emailOrPhoneNumberValue,
                emailAddress: '',
                password: passwordValue,
            }

            const { data, status } = await request.post('/users/create', newAccountInfo);

            if (status === 200) {
                setIsPasswordHidden(true);
                setIsFormValidated(true);
                setErrorText('');
                setUsernameValue('');
                setEmailOrPhoneNumberValue('');
                setPasswordValue('');
                setRepeatPasswordValue('');
                setAgreementValue('');
                navigate('/home');
                navigate(0);
                window.scrollTo(0,0)
            } else {
                setErrorText(data.message);
                setIsFormValidated(false);
            }

        }

    }

    const fetchUserInfo = async () => {
        const { data, status } = await request.get('/users/all');
        if (status === 200) {
            setUserEmails(data.userEmails);
            setUserPhoneNumbers(data.userPhoneNumbers);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    })

    return (
        <sign-up-dialog>
            <title-and-close>
                <p>{languageMode === 'en' ? 'Create a new account' : 'Utwórz nowe konto'}</p>
                <img src={close} alt='close sign in form' onClick={handleClose}/>
            </title-and-close>
            <sign-up-image>
                <img src='http://localhost:8000/images/Login/signin.png' alt='sign in image'/>
            </sign-up-image>
            <sign-up-form>
                <form-section>
                    <p>{languageMode === 'en' ? 'Username:' : 'Nazwa użytkownika'}</p>
                    <input-container>
                        <img src={user} alt='user icon' className='userIcon'/>
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'Username:' : 'Nazwa użytkownika'}
                            value={usernameValue}
                            onChange={handleUsernameChange}
                        />
                    </input-container>
                </form-section>
                <form-section>
                    <p>{languageMode === 'en' ? 'Your email or phone number:' : 'Twój adres email lub numer telefonu'}</p>
                    <input-container>
                        <img src={email} alt='letter icon' className='emailIcon'/>
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'Email or phone number:' : 'Adres email lub numer telefonu'}
                            value={emailOrPhoneNumberValue}
                            onChange={handleEmailOrPhoneNumberChange}
                        />
                    </input-container>
                </form-section>
                <form-section>
                    <p>{languageMode === 'en' ? 'New password:' : 'Nowe hasło'}</p>
                    <input-container>
                        <img src={lock} alt='lock icon' className='lockIcon'/>
                        <input
                            type={isPasswordHidden ? 'password' : 'text'}
                            placeholder={languageMode === 'en' ? 'Password' : 'Hasło'}
                            value={passwordValue}
                            onChange={handlePasswordChange}
                        />
                        {isPasswordHidden ? <img src={passwordShow} alt='show password' className='passwordShowIcon' onClick={handlePasswordShow}/> : <img src={passwordHide} alt='hide password' className='passwordHideIcon' onClick={handlePasswordShow}/>
                        }
                    </input-container>
                </form-section>
                <form-section>
                    <p>{languageMode === 'en' ? 'Repeat password:' : 'Powtórz hasło'}</p>
                    <input-container>
                        <input
                            className='repeatPassword'
                            type='password'
                            placeholder={languageMode === 'en' ? 'Password' : 'Hasło'}
                            value={repeatPasswordValue}
                            onChange={handleRepeatPasswordChange}
                        />
                    </input-container>
                </form-section>
                <checkbox-agreement>
                    <input
                        type='checkbox'
                        value={agreementValue}
                        onChange={handleAgreementChange}    
                    />
                    <agreement-text>
                        <p>{languageMode === 'en' ? 'I agree and consent to' : 'Zgadzam się na'}</p>
                        <a href='/terms-and-conditions'>{languageMode === 'en' ? 'Terms & Conditions' : 'Warunki użytkowania'}</a>
                    </agreement-text>
                </checkbox-agreement>
            </sign-up-form>
            <validation-message>{isFormValidated ? null : <p>{errorText}</p>}</validation-message>
            <create-account-button onClick={handleCreateAccountButton}><p>{languageMode === 'en' ? 'Create a new account' : 'Utwórz nowe konto'}</p></create-account-button>
        </sign-up-dialog>
    );
}

export default SignUp;