import ProductSquare from "../../../../Products/ProductSquare/ProductSquare";

import PropTypes from 'prop-types';

import './ProductsPanel.scss';

const ProductsPanel = (props) => {
    const { title, productsData } = props;
    const products = productsData.map(product =>
        <ProductSquare
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            delivery={product.delivery}
            quantity={product.quantity}
            images={product.images}
            categories={product.categories}
            reviews={product.reviews}
        />)

    return (
        <products-panel>
            <products-panel-title>
                <p>{title}</p>
            </products-panel-title>
            <products-panel-products>{products}</products-panel-products>
        </products-panel>
    );
}

ProductsPanel.propTypes = {
    title: PropTypes.string,
    productsData: PropTypes.array,
}

export default ProductsPanel;