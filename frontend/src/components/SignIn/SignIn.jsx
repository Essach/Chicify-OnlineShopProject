import './SignIn.scss';

import close from '../../icons/closeMintyBlue.svg';
import email from '../../icons/emailLogin.svg';
import lock from '../../icons/lock.svg';
import passwordShow from '../../icons/passwordShow.svg';
import passwordHide from '../../icons/passwordHide.svg';
import user from '../../icons/userSignin.svg';

import { useEffect, useState } from 'react';

import request from '../../helpers/request';

import { useNavigate } from 'react-router';

const SignIn = () => {
    const navigate = useNavigate()

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
    const handleEmailOrPasswordChange = (e) => setEmailOrPhoneNumberValue(e.target.value);
    const handlePasswordChange = (e) => setPasswordValue(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPasswordValue(e.target.value);
    const handleAgreementChange = () => setAgreementValue(prev => !prev)

    const handlePasswordShow = () => setIsPasswordHidden(prev => !prev)

    const validateSignInForm = () => {
        if (usernameValue === '' || emailOrPhoneNumberValue === '' || passwordValue === '' || repeatPasswordValue === '') {
            setErrorText('*Please fill in all fields');
            setIsFormValidated(false);
            return false
        } else if (agreementValue === false) {
            setErrorText('*You have to agree to terms & conditions to proceed');
            setIsFormValidated(false);
            return false
        } else if (!(/@/.test(emailOrPhoneNumberValue)) && !(/\d/.test(emailOrPhoneNumberValue))) {
            setErrorText('*Please insert an email or phone number');
            setIsFormValidated(false);
            return false
        } else if (/\d/.test(emailOrPhoneNumberValue) && emailOrPhoneNumberValue.length !== 9) {
            setErrorText('*Please insert an email or phone number');
            setIsFormValidated(false);
            return false
        } else if (repeatPasswordValue !== passwordValue) {
            setErrorText("*Passwords don't match");
            setIsFormValidated(false);
            return false
        } else if (userEmails === undefined || userPhoneNumbers === undefined) {
            setErrorText('*Internal server error 2');
            setIsFormValidated(false);
            return false
        } else if (userEmails.find(email => email === emailOrPhoneNumberValue) !== undefined) {
            setErrorText('*Email already in use');
            setIsFormValidated(false);
            return false
        } else if (userPhoneNumbers.find(phoneNum => phoneNum === emailOrPhoneNumberValue) !== undefined) {
            setErrorText('*Phone number already in use');
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
        <sign-in-dialog>
            <title-and-close>
                <p>Create a new account</p>
                <img src={close} alt='close sign in form'/>
            </title-and-close>
            <sign-in-image>
                <img src='http://localhost:8000/images/Login/signin.png' alt='sign in image'/>
            </sign-in-image>
            <sign-in-form>
                <form-section>
                    <p>Username:</p>
                    <input-container>
                        <img src={user} alt='user icon' className='userIcon'/>
                        <input
                            type="text"
                            placeholder='Username'
                            value={usernameValue}
                            onChange={handleUsernameChange}
                        />
                    </input-container>
                </form-section>
                <form-section>
                    <p>Your email or phone number:</p>
                    <input-container>
                        <img src={email} alt='letter icon' className='emailIcon'/>
                        <input
                            type="text"
                            placeholder='Email or phone number'
                            value={emailOrPhoneNumberValue}
                            onChange={handleEmailOrPasswordChange}
                        />
                    </input-container>
                </form-section>
                <form-section>
                    <p>New password:</p>
                    <input-container>
                        <img src={lock} alt='lock icon' className='lockIcon'/>
                        <input
                            type={isPasswordHidden ? 'password' : 'text'}
                            placeholder='Password'
                            value={passwordValue}
                            onChange={handlePasswordChange}
                        />
                        {isPasswordHidden ? <img src={passwordShow} alt='show password' className='passwordShowIcon' onClick={handlePasswordShow}/> : <img src={passwordHide} alt='hide password' className='passwordHideIcon' onClick={handlePasswordShow}/>
                        }
                    </input-container>
                </form-section>
                <form-section>
                    <p>Repeat password:</p>
                    <input-container>
                        <input
                            className='repeatPassword'
                            type='password'
                            placeholder='Password'
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
                        <p>I agree and consent to</p>
                        <a href='/terms-and-conditions'>Terms & Conditions</a>
                    </agreement-text>
                </checkbox-agreement>
            </sign-in-form>
            <validation-message>{isFormValidated ? null : <p>{errorText}</p>}</validation-message>
            <create-account-button onClick={handleCreateAccountButton}><p>Create a new account</p></create-account-button>
        </sign-in-dialog>
    );
}

export default SignIn;