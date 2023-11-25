import Product from "../../../../Product/Product";

import PropTypes from 'prop-types';

import './ProductsPanel.scss';
import { useEffect, useState } from "react";

const ProductsPanel = (props) => {
    const { title, productsData } = props;

    const [productType, setProductType] = useState('squareHomePage');

    const products = productsData.map(product =>
        <Product
            key={product.ID}
            id={product.ID}
            name={product.name}
            price={product.price}
            delivery={product.delivery}
            quantity={product.quantity}
            images={product.images}
            categories={product.categories}
            reviews={product.reviews}
            sellerId={product.sellerId}
            type={productType}
        />)
    
    const resizeFunc = () => {
        if (window.innerWidth > 1100) {
            setProductType('squareHomePage');
        } else {
            setProductType('rectangleHomePage')
        }
    }
    
    useEffect(() => {
        resizeFunc();

        window.addEventListener('resize', resizeFunc);

        return () => {
            window.removeEventListener('resize', resizeFunc);
        }
    },[])

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