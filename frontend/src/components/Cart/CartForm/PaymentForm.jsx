import PropTypes from 'prop-types';
import { useContext } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import calendar from '../../../icons/calendarIcon.svg';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentForm = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isVisible, cardHandler, expirationHandler, cvvHandler, postalHandler, creditValue, cvvValue, postalValue, goBackHandler, expirationDate} = props;

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
                    <label style={{position: 'relative', width: '10rem'}}>
                        <DatePicker
                            selected={expirationDate}
                            onChange={expirationHandler}
                            showMonthYearPicker
                            className='custom-datepicker'
                        />
                        <img src={calendar} alt='calendar icon' style={{position: 'absolute', right: '5px', top: '2px', transform: 'scale(0.8)'}}/>
                    </label>
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