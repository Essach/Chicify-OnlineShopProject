import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/CartReducer";

import PropTypes from 'prop-types';

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: []})

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.object
}

export default CartProvider