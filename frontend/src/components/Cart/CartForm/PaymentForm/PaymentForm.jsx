import './PaymentForm.scss';

import PropTypes from 'prop-types';

const PaymentForm = (props) => {
    const { isVisible, cardHandler, expirationHandler, cvvHandler, postalHandler, creditValue, cvvValue, postalValue, goBackHandler} = props;

    return (
        <div className={`cart-payment-form-${isVisible ? 'visible' : 'hidden'}`}>
                <go-back-btn onClick={goBackHandler}>
                    Go back
                </go-back-btn>
                <form-label>
                    <p>CREDIT CARD NUMBER</p>
                <input type='text' maxLength={16} value={creditValue} onChange={cardHandler} className='num' />
                </form-label>
                <form-label>
                    <p>EXPIRATION DATE</p>
                <input type='month' onChange={expirationHandler} className='month' />
                </form-label>
                <form-label>
                    <p>CVV NUMBER</p>
                    <input type='text' maxLength={3} value={cvvValue} onChange={cvvHandler} className='num' />
                </form-label>
                <form-label>
                    <p>POSTAL CODE</p>
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