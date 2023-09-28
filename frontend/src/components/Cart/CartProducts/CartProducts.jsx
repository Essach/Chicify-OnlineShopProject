import CartProduct from './CartProduct/CartProduct';
import './CartProducts.scss';

import PropTypes from 'prop-types';

const CartProducts = ({ products }) => {

    return (
        <div className={`cart-products-${products.length > 0 ? 'shown' : 'hidden'}`}>
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
        </div>
    );
}

CartProducts.propTypes = {
    products: PropTypes.array,
}

export default CartProducts;