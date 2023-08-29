import { useState } from 'react';

import './PasswordRecovery.scss';
import PasswordRecoveryVerification from './PasswordRecoveryVerification/PasswordRecoveryVerification';
import PasswordRecoveryReset from './PasswordRecoveryReset/PasswordRecoveryReset';



const PasswordRecovery = () => {
    const [emailOrPhoneNumberValue, setEmailOrPhoneNumberValue] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const handleOnChangeEmailOrPhoneNumber = (e) => {
        setEmailOrPhoneNumberValue(e.target.value)
    }

    const verifyBtnFunction = () => {
        setIsCodeVerified(true);
    }

    return (
        <password-recovery>
            {!isCodeVerified ? <PasswordRecoveryVerification
                emailOrPhoneNumberValue={emailOrPhoneNumberValue}
                handleOnChangeEmailOrPhoneNumber={handleOnChangeEmailOrPhoneNumber}
                verifyBtnFunction={verifyBtnFunction}
            /> : 
            <PasswordRecoveryReset emailOrPhoneNumberValue={emailOrPhoneNumberValue}/>
            }
        </password-recovery>
    );
}

export default PasswordRecovery;