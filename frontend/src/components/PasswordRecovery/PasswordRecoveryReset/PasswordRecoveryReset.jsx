import './PasswordRecoveryReset.scss';

import lock from '../../../icons/lock.svg';
import passwordShow from '../../../icons/passwordShow.svg';
import passwordHide from '../../../icons/passwordHide.svg';

import { useContext, useState } from 'react';

import request from '../../../helpers/request';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router';
import { StoreContext } from '../../../store/StoreProvider';

const PasswordRecoveryReset = ({ emailOrPhoneNumberValue }) => {
    const navigate = useNavigate();

    const { languageMode } = useContext(StoreContext);

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [passwordValue, setPasswordValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
    const [isFormValidated, setIsFormValidated] = useState(true)
    const [validationMessage, setValidationMessage] = useState('')


    const validatePasswordsMatch = () => {
        if (repeatPasswordValue !== passwordValue) {
            if (languageMode === 'en') setValidationMessage("*Passwords don't match");
            else setValidationMessage("*Hasła się nie zgadzają");
            setIsFormValidated(false);
            return false;
        } else if (passwordValue === '' || repeatPasswordValue === '') {
            if (languageMode === 'en') setValidationMessage("*Enter valid info");
            else setValidationMessage("*Wprowadź prawidłowe informacje");
            setIsFormValidated(false);
            return false;
        }
        return true;
    }

    const handlePasswordChange = (e) => setPasswordValue(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPasswordValue(e.target.value);

    const handleTogglePasswordBtn = () => setIsPasswordHidden(prev => !prev)

    const handleSetNewPassword = async () => {
        const isFormValid = validatePasswordsMatch()
        if (isFormValid && emailOrPhoneNumberValue !== undefined) {

            let loginType;
            if (/@/.test(emailOrPhoneNumberValue)) {
                loginType = 'emailAddress';
            } else if (/\d/.test(emailOrPhoneNumberValue)) {
                loginType = 'phoneNumber';
            }

            const { status } = await request.patch('/users/password', {
                loginType: loginType,
                login: emailOrPhoneNumberValue,
                newPassword: passwordValue
            })

            if (status === 200) {
                setValidationMessage('');
                setIsFormValidated(true);
                setPasswordValue('');
                setRepeatPasswordValue('');
                navigate('/home');
                window.scrollTo(0, 0);
            } else if(status===404){
                setValidationMessage("*Account with given information doesn't exist");
                setIsFormValidated(false);
            } else if (status === 500) {
                setValidationMessage("*Internal server error. Please try again later");
                setIsFormValidated(false);
            }
        }
    }

    return (
        <password-recovery-reset>
            <password-recovery-title>
                {languageMode === 'en' ? 'Reset your password' : 'Zresetuj swoje hasło'}
            </password-recovery-title>
            <reset-form>
                <form-section>
                    <p>
                        {languageMode === 'en' ? 'Enter new password:' : 'Wprowadź nowe haslo'}
                    </p>
                    <input-container>
                        <img src={lock} alt='lock icon' className='lockIcon'/>
                        <input
                            type={isPasswordHidden ? 'password' : 'text'}
                            placeholder={languageMode === 'en' ? 'Password' : 'Hasło'}
                            value={passwordValue}
                            onChange={handlePasswordChange}
                        />
                        {isPasswordHidden ? <img src={passwordShow} alt='show password' className='passwordShowIcon' onClick={handleTogglePasswordBtn} /> : <img src={passwordHide} alt='hide password' className='passwordHideIcon' onClick={handleTogglePasswordBtn} />
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
            </reset-form>
            {!isFormValidated && <validation-message>{validationMessage}</validation-message>}
            <reset-password-button onClick={handleSetNewPassword}>
                <p>{languageMode === 'en' ? 'Set new password' : 'Ustaw nowe hasło'}</p>
            </reset-password-button>
        </password-recovery-reset>
    );
}

PasswordRecoveryReset.propTypes = {
    emailOrPhoneNumberValue: PropTypes.string,
}

export default PasswordRecoveryReset;