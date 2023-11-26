import './PasswordRecoveryVerification.scss';

import close from '../../../icons/closeMintyBlue.svg';
import email from '../../../icons/emailLogin.svg';

import { useContext, useState } from 'react';

import PropTypes from 'prop-types';
import { StoreContext } from '../../../store/StoreProvider';

const PasswordRecoveryVerification = (props) => {
    const { emailOrPhoneNumberValue, handleOnChangeEmailOrPhoneNumber, verifyBtnFunction } = props;

    const { languageMode } = useContext(StoreContext);

    const [verifyCodeValue, setVerifyCodeValue] = useState('')
    const [isFormValidated, setIsFormValidated] = useState(true)

    const validateSendEmailForm = () => {
        if (emailOrPhoneNumberValue === '' || (!(/@/.test(emailOrPhoneNumberValue)) && !(/\d/.test(emailOrPhoneNumberValue)))) {
            setIsFormValidated(false);
            return false;
        } else if (/\d/.test(emailOrPhoneNumberValue) && emailOrPhoneNumberValue.length !== 9) {
            setIsFormValidated(false);
            return false
        }
        return true
    }

    const handleOnChangeVerificationCode = (e) => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined) {
            setVerifyCodeValue(e.target.value)
        }
    }

    const handleSendEmail = () => {
        const isValidated = validateSendEmailForm();
        if (isValidated) {
            setIsFormValidated(true)
        }
    }

    const handleVerifyButton = () => {
        if (verifyCodeValue.length === 6 && validateSendEmailForm()) {
            verifyBtnFunction()
        }
    }

    return (
        <password-recovery-verification>
            <title-and-close>
                <p>{languageMode === 'en' ? 'Recover your password' : 'Odzyskaj hasło'}</p>
                <close-btn>
                    <img src={close} alt='close password recovery'/>
                </close-btn>
            </title-and-close>
            <info-text>
                {languageMode === 'en' ? 'Enter your email or phone number. A code will be sent to verify your identity.  After validation a password reset window will appear.' : 'Wpisz swój adres e-mail lub numer telefonu. Zostanie wysłany kod w celu zweryfikowania Twojej tożsamości. Po zatwierdzeniu pojawi się okno resetowania hasła.'}
            </info-text>
            <password-recovery-form>
                <form-title>
                    {languageMode === 'en' ? 'Enter your email or phone number associated with your account:' : 'Podaj swój adres e-mail lub numer telefonu powiązany z Twoim kontem:'}
                </form-title>
                <input-container>
                        <img src={email} alt='email icon' className='email'/>
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'Your email or phone number' : 'Twój adres email lub numer telefonu'}
                            value={emailOrPhoneNumberValue}
                            onChange={handleOnChangeEmailOrPhoneNumber}
                        />
                </input-container>
                <send-btn>
                    <p onClick={handleSendEmail}>{languageMode === 'en' ? 'Send verification code' : 'Wyślij kod weryfikacyjny'}</p>
                </send-btn>
                {!isFormValidated && <validation-message>{languageMode === 'en' ? '*Please insert an email or phone number' : '*Proszę podać adres email lub number telefonu'}</validation-message>}
            </password-recovery-form>
            <verification-code-form>
                <input-container>
                    <form-text>{languageMode === 'en' ? 'Enter verification code:' : 'Wprowadź kod weryfikacyjny'}</form-text>
                    <input type='text' maxLength={6} value={verifyCodeValue} onChange={handleOnChangeVerificationCode} />
                </input-container>
                <verify-btn onClick={handleVerifyButton}>
                    <p>{languageMode === 'en' ? 'Verify' : 'Zweryfikuj'}</p>
                </verify-btn>
            </verification-code-form>
        </password-recovery-verification>
    );
}

PasswordRecoveryVerification.propTypes = {
    emailOrPhoneNumberValue: PropTypes.any,
    handleOnChangeEmailOrPhoneNumber: PropTypes.func,
    verifyBtnFunction: PropTypes.func,
}

export default PasswordRecoveryVerification;