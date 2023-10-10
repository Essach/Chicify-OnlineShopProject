import { useEffect, useState } from 'react';
import './OrderPage.scss';

import { PropTypes } from 'prop-types';

import request from '../../../../helpers/request';

const OrderPage = ({ id, closeOrderPage }) => {

    const [details, setDetails] = useState([])
    console.log(details)

    const setMoreDetails = async (paymentId) => {
        const { status, data } = await request.get(`/payments/${paymentId}`);
        if (status === 200) {
            setDetails(data);
        } else if (status === 500) {
            throw new Error(data.error);
        } else {
            throw new Error(data.message);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            setMoreDetails(id)
        }
    },[id])

    return (
        <>
            Essa
        </>
    );
}

OrderPage.propTypes = {
    id: PropTypes.string,
    closeOrderPage: PropTypes.func,
}

export default OrderPage;