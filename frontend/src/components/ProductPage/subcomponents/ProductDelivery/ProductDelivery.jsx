import './ProductDelivery.scss';

import PropTypes from 'prop-types';

const ProductDelivery = ({delivery}) => {

    const deliveryOptions = delivery.map(item => (
        <div key={item.type}>
            <p>{item.type}</p>
            <p>US$ {item.price}</p>
        </div>
    ))

    return (
        <product-delivery>
            <delivery-title><p>Delivery options</p></delivery-title>
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