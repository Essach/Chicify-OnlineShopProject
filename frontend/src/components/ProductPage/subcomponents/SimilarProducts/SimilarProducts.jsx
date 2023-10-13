import { useContext } from 'react';
import './SimilarProducts.scss';

import { StoreContext } from "../../../../store/StoreProvider";

import Product from '../../../Product/Product';

const SimilarProducts = () => {
    const { products } = useContext(StoreContext);
    const productsComponents = products.slice(0,3).map(product => (
        <Product key={product.ID}
            id={product.ID}
            name={product.name}
            price={product.price}
            delivery={product.delivery}
            images={product.images}
            reviews={product.reviews}
            type='rectangleProductPage' />
    ))

    return (
        <similar-products>
            <sp-title>
                <p>Similar products</p>
            </sp-title>
            <products-components>
                {productsComponents}
            </products-components>
        </similar-products>
    );
}

export default SimilarProducts;