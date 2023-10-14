import { useContext, useEffect, useState } from 'react';

import './CartForm.scss';

import PropTypes from 'prop-types';

import standard from '../../../icons/deliveryStandard.svg';
import express from '../../../icons/deliveryExpress.svg';

import { CartContext } from '../../../context/CartContext';
import { StoreContext } from '../../../store/StoreProvider';

import PaymentForm from './PaymentForm/PaymentForm';
import AddressForm from './AddressForm/AddressForm.scss/AddressForm';

import request from '../../../helpers/request';

import { updateUser } from '../../../helpers/localStorage';

const CartForm = (props) => {
    const { price, delivery } = props;
    // console.log(price, delivery)

    const { state, dispatch } = useContext(CartContext)

    const { user, setUser } = useContext(StoreContext);


    const [countryValue, setCountryValue] = useState('');
    const [nameValue, setNameValue] = useState('')
    const [addressValue, setAddressValue] = useState('');
    const [cityValue, setCityValue] = useState('')

    const [creditCardNum, setCreditCardNum] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvvNumber, setCvvNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryOption, setDeliveryOption] = useState('');
    
    const [paymentMethod, setPaymentMethod] = useState('');

    const [validationMessage, setValidationMessage] = useState('');
    const [isValidationMessageVisible, setIsValidationMessageVisible] = useState(false);

    const [areFormsVisiblePayment, setAreFormsVisiblePayment] = useState(false);
    const [areFormsVisibleDelivery, setAreFormsVisibleDelivery] = useState(false);

    const [isAddressFormValidated, setIsAddressFormValidated] = useState(false);

    const [isFormValidatedOuter, setIsFormValidatedOuter] = useState(true);
    const [formMessage, setFormMessage] = useState('');

    const [wasPurchaseMade, setWasPurchaseMade] = useState(false);

    const handleChangeCountry = e => setCountryValue(e.target.value);
    const handleChangeName = e => setNameValue(e.target.value);
    const handleChangeAddress = e => setAddressValue(e.target.value);
    const handleChangeCity = e => setCityValue(e.target.value);

    const handleChangeCreditCardNum = e => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined) {
            setCreditCardNum(e.target.value);
        }
    }
    const handleChangeExpirationDate = e => setExpirationDate(e.target.value);
    const handleChangeCvvNumber = e => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined) {
            setCvvNumber(e.target.value);
        }
    }
    const handleChangePostalCode = e => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined || /[-]/.test(e.target.value.at(-1)) || /^[0-9]*$/.test(e.target.value.at(-1))) {
            setPostalCode(e.target.value);
        }
    }

    const handleGoBackBtn = () => {
        setIsAddressFormValidated(false);
    }


    const handleClickStandardDelivery = () => {
        setDeliveryPrice(delivery.standardPrice);
        setDeliveryOption('standard');
        setAreFormsVisibleDelivery(true);
    };
    const handleClickExpressDelivery = () => {
        setDeliveryPrice(delivery.expressPrice);
        setDeliveryOption('express');
        setAreFormsVisibleDelivery(true);
    }

    const handleClickCreditPayment = () => {
        setPaymentMethod('credit');
        setAreFormsVisiblePayment(true);
    }
    const handleClickGpayPayment = () => {
        setPaymentMethod('gpay');
        setAreFormsVisiblePayment(true);
    }

    
    const validateAddressForm = () => {
        if (countryValue === '' || nameValue === '' || addressValue === '' || cityValue === '') {
            setValidationMessage('*Please fill in all the fields');
            setIsValidationMessageVisible(true);
            return false;
        } else if (nameValue !== '' && /\d/.test(nameValue)) {
            setValidationMessage('*Please enter a real name');
            setIsValidationMessageVisible(true);
            return false;
        }
        return true;
    }

    const handleProceedBtnClick = () => {
        const isValidated = validateAddressForm();
        if (isValidated) {
            setIsAddressFormValidated(true);
            setIsValidationMessageVisible(false);
        }
    }

    
    const validatePaymentForm = () => {
        const date = new Date();

        if (creditCardNum === '' || expirationDate === '' || cvvNumber === '' || postalCode === '') {
            setValidationMessage('*Please fill in all the fields');
            setIsValidationMessageVisible(true);
            return false
        } else if ((parseInt(expirationDate.split('-')[0]) < date.getFullYear()) ||
            (parseInt(expirationDate.split('-')[0]) === date.getFullYear() && parseInt(expirationDate.split('-')[1]) < date.getMonth() + 1)) {
            setValidationMessage('*Please enter valid data');
            setIsValidationMessageVisible(true);
            return false
        } else if (creditCardNum.length !== 16 || cvvNumber.length !== 3) {
            setValidationMessage('*Please enter valid data');
            setIsValidationMessageVisible(true);
            return false;
        }
        return true
    }

    const handlePayBtn = async () => {
        const isValidated = validatePaymentForm();
        if (isValidated) {
            
            const { data: paymentData, status: paymentStatus } = await request.post('/payments', {
                products: state.cart,
                price: price + deliveryPrice,
                address: { country: countryValue, name: nameValue, address: addressValue, city: cityValue },
                cardInfo: {number: creditCardNum, expiration: expirationDate, cvv: cvvNumber, postal: postalCode}
            })           

            if (paymentStatus === 200) {
                const products = state.cart.map(item => ({...item, status: 'inDelivery'}))
                const { data: userData, status: userStatus } = await request.patch('/users/orders', { products: products, price: price + deliveryPrice, userId: user.userId, paymentId: paymentData.paymentId });
                if (userStatus === 200) {
                    setUser(userData.user);
                    updateUser(userData.user);
                } else {
                    throw new Error(userData.message);
                }

                setValidationMessage('');
                setIsValidationMessageVisible(false);
                dispatch({
                    type: 'CLEAR',
                    payload: {}
                })
                setWasPurchaseMade(true);
                setTimeout(() => setWasPurchaseMade(false), 2000);
            } else {
                throw new Error(paymentData.message)
            }


        }
    }

    useEffect(() => {
        if (state !== undefined && state.cart.length <= 0) {
            if (!wasPurchaseMade) {
                setIsFormValidatedOuter(false);
                setFormMessage('The cart is empty');
            } else {
                setIsFormValidatedOuter(false);
                setFormMessage('Thank you for purchasing our products')
            }
        } else if (!user) {
            setIsFormValidatedOuter(false);
            setFormMessage('Log in to proceed to payment');
        } else {
            setIsFormValidatedOuter(true)
        }
    },[user, state, wasPurchaseMade])


    return (
        <cart-form-component>
            {isFormValidatedOuter ? 
            <div className='cart-box'>
                <cart-form-options>
                    <cart-form-container>
                        <cart-form-title>
                            Payment method
                        </cart-form-title>
                        <div className={paymentMethod === 'credit' ? 'option-active' : 'option-inactive'} onClick={handleClickCreditPayment}>
                            <img src={'http://localhost:8000/images/paymentImages/creditcard.png'} alt='visa or mastercard credit card' />
                            <p>Credit card</p>
                        </div>
                        <div className={paymentMethod === 'gpay' ? 'option-active' : 'option-inactive'} onClick={handleClickGpayPayment}>
                            <img src={'http://localhost:8000/images/paymentImages/gpay.png'} alt='visa or mastercard credit card' />
                            <p>Google pay</p>
                        </div>
                    </cart-form-container>
                    <cart-form-container>
                        <cart-form-title>
                            Delivery option
                        </cart-form-title>
                        <div className={deliveryOption === 'standard' ? 'option-active' : 'option-inactive'} onClick={handleClickStandardDelivery}>
                            <img src={standard} alt='standard delivery' />
                            <p>Standard</p>
                        </div>
                        <div className={deliveryOption === 'express' ? 'option-active' : 'option-inactive'} onClick={handleClickExpressDelivery}>
                            <img src={express} alt='express delivery' />
                            <p>Express</p>
                        </div>
                    </cart-form-container>
                </cart-form-options>
                {isAddressFormValidated ?
                    <PaymentForm
                        isVisible={areFormsVisiblePayment && areFormsVisibleDelivery}
                        cardHandler={handleChangeCreditCardNum}
                        expirationHandler={handleChangeExpirationDate}
                        cvvHandler={handleChangeCvvNumber}
                        postalHandler={handleChangePostalCode}
                        creditValue={creditCardNum}
                        cvvValue={cvvNumber}
                        postalValue={postalCode}
                        goBackHandler={handleGoBackBtn}
                        
                    /> :
                    <AddressForm
                        isVisible={areFormsVisiblePayment && areFormsVisibleDelivery}
                        countryHandler={handleChangeCountry}
                        nameHandler={handleChangeName}
                        addressHandler={handleChangeAddress}
                        cityHandler={handleChangeCity}
                        country={countryValue}
                        name={nameValue}
                        address={addressValue}
                        city={cityValue}
                    />
                    }
                    {isValidationMessageVisible ? <validation-message>{validationMessage}</validation-message> : null}
                    {(areFormsVisiblePayment && areFormsVisibleDelivery) ? <>
                            <price-and-button>
                                <price-info>
                                    <p className='small'>{`Products cost: US$ ${price}`}</p>
                                    <p className='small'>{`Delivery cost: US$ ${deliveryPrice}`}</p>
                                    <p className='big'>{`Total cost: US$ ${price + deliveryPrice}`}</p>
                                </price-info>
                                    {isAddressFormValidated ?
                                        <pay-and-order-btn>
                                            <p onClick={handlePayBtn}>
                                                Pay and Order
                                            </p>
                                        </pay-and-order-btn> :
                                        <proceed-button>
                                            <p onClick={handleProceedBtnClick}>Proceed to payment</p>
                                        </proceed-button>}
                            </price-and-button>
                        </>
                        : <select-message><p>Please select a payment and a delivery method</p></select-message>
                    }
            </div>
            :
            <form-message>
                    <p className='form-message'>{formMessage}</p>
            </form-message>
            }
        </cart-form-component>
    );
}

CartForm.propTypes = { 
    price: PropTypes.number,
    delivery: PropTypes.object,
}

export default CartForm;