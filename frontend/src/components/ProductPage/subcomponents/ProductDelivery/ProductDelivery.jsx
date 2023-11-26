import { useContext } from 'react';
import './ProductDelivery.scss';

import PropTypes from 'prop-types';
import { StoreContext } from '../../../../store/StoreProvider';

const ProductDelivery = ({delivery}) => {
    const { languageMode } = useContext(StoreContext);

    const deliveryOptions = delivery.map(item => (
        <div key={item.type}>
            <p>{item.type}</p>
            <p>{languageMode === 'en' ? `US$ ${item.price}` : `${item.price*4} zł`}</p>
        </div>
    ))

    return (
        <product-delivery>
            <delivery-title><p>{languageMode === 'en' ? 'Delivery options' : 'Opcje dostawy'}</p></delivery-title>
            <product-delivery-options>
                {deliveryOptions}
            </product-delivery-options>
        </product-delivery>
    );
}

ProductDelivery.propTypes = {
    delivery: PropTypes.array,
}

export default ProductDelivery;