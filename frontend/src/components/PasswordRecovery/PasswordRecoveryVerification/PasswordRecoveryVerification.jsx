import './PasswordRecoveryVerification.scss';

import close from '../../../icons/closeMintyBlue.svg';
import email from '../../../icons/emailLogin.svg';

import { useState } from 'react';

import PropTypes from 'prop-types';

const PasswordRecoveryVerification = (props) => {
    const { emailOrPhoneNumberValue, handleOnChangeEmailOrPhoneNumber, verifyBtnFunction } = props;

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
        if (/\d/.test(e.target.value.at(-1)) || e.target.value.at(-1) === undefined) {
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
                <p>Recover your password</p>
                <close-btn>
                    <img src={close} alt='close password recovery'/>
                </close-btn>
            </title-and-close>
            <info-text>
                Enter your email or phone number. A code will be sent to verify your identity.  After validation a password reset window will appear.
            </info-text>
            <password-recovery-form>
                <form-title>
                    Enter your email or phone number associated with your account:
                </form-title>
                <input-container>
                        <img src={email} alt='email icon' className='email'/>
                        <input
                            type="text"
                            placeholder='Your email or phone number'
                            value={emailOrPhoneNumberValue}
                            onChange={handleOnChangeEmailOrPhoneNumber}
                        />
                </input-container>
                <send-btn>
                    <p onClick={handleSendEmail}>Send verification code</p>
                </send-btn>
                {!isFormValidated && <validation-message>*Please insert an email or phone number</validation-message>}
            </password-recovery-form>
            <verification-code-form>
                <input-container>
                    <form-text>Enter verification code:</form-text>
                    <input type='text' maxLength={6} value={verifyCodeValue} onChange={handleOnChangeVerificationCode} />
                </input-container>
                <verify-btn onClick={handleVerifyButton}>
                    <p>Verify</p>
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