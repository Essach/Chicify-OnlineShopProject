import PropTypes from 'prop-types';
import './ProductDescription.scss';
import { useContext } from 'react';
import { StoreContext } from '../../../../store/StoreProvider';

const ProductDescription = ({ description }) => {
    const { languageMode } = useContext(StoreContext);
    return (
        <product-description>
            <p className='description-title'>{languageMode === 'en' ? 'Product description' : 'Opis'}</p>
            <p className='description-text'>{description}</p>
        </product-description>
    );
}

ProductDescription.propTypes = {
    description: PropTypes.string,
}

export default ProductDescription;