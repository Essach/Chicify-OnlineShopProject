import PropTypes from 'prop-types';
import { useContext } from 'react';
import { StoreContext } from '../../../store/StoreProvider';

const PaymentForm = (props) => {
    const { isVisible, cardHandler, expirationHandler, cvvHandler, postalHandler, creditValue, cvvValue, postalValue, goBackHandler} = props;

    const { languageMode } = useContext(StoreContext);

    return (
        <div className={`cart-payment-form-${isVisible ? 'visible' : 'hidden'}`}>
                <go-back-btn onClick={goBackHandler}>
                    {languageMode === 'en' ? 'Go back' : 'Powrót'}
                </go-back-btn>
                <form-label>
                    <p>{languageMode === 'en' ? 'CREDIT CARD NUMBER' : 'NUMER KARTY KREDYTOWEJ'}</p>
                <input type='text' maxLength={16} value={creditValue} onChange={cardHandler} className='num' />
                </form-label>
                <form-label>
                    <p>{languageMode === 'en' ? 'EXPIRATION DATE' : 'TERMIN WAŻNOŚCI'}</p>
                <input type='month' onChange={expirationHandler} className='month' />
                </form-label>
                <form-label>
                    <p>{languageMode === 'en' ? 'CVV NUMBER' : 'NUMER CVV'}</p>
                    <input type='text' maxLength={3} value={cvvValue} onChange={cvvHandler} className='num' />
                </form-label>
                <form-label>
                    <p>{languageMode === 'en' ? 'POSTAL CODE' : 'KOD POCZTOWY'}</p>
                    <input type='text' maxLength={10} value={postalValue} onChange={postalHandler} className='num' />
                </form-label>
        </div>
    );
}

PaymentForm.propTypes = {
    isVisible: PropTypes.bool,
    cardHandler: PropTypes.func, 
    expirationHandler: PropTypes.func, 
    cvvHandler: PropTypes.func, 
    postalHandler: PropTypes.func,
    creditValue: PropTypes.string,
    cvvValue: PropTypes.string,
    postalValue: PropTypes.string,
    goBackHandler: PropTypes.func,
}

export default PaymentForm;