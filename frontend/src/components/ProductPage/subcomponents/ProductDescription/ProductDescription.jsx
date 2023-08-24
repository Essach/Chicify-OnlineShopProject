import PropTypes from 'prop-types';
import './ProductDescription.scss';

const ProductDescription = ({description}) => {
    return (
        <product-description>
            <p className='description-title'>Product description</p>
            <p className='description-text'>{description}</p>
        </product-description>
    );
}

ProductDescription.propTypes = {
    description: PropTypes.string,
}

export default ProductDescription;