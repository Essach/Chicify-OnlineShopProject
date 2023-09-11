import CartProduct from './CartProduct/CartProduct';
import './CartProducts.scss';

import PropTypes from 'prop-types';

const CartProducts = ({products}) => {
    return (
        <cart-products>
            {products.map(product => <CartProduct
                key={product.id}
                id={product.id}
                image={product.images[0]}
                name={product.name}
                reviews={product.reviews}
                delivery={product.delivery}
                quantity={product.currentQuantity}
                maxQuantity={product.quantity}
                price={product.price}
            />)}
        </cart-products>
    );
}

CartProducts.propTypes = {
    products: PropTypes.array,
}

export default CartProducts;