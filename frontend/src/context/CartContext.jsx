import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/CartReducer";

import PropTypes from 'prop-types';
import { getCartSaved } from "../helpers/localStorage";

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: []
    })
    
    useEffect(() => {
        const savedCart = getCartSaved();
        if (savedCart.cart.length > 0) {
            dispatch({
                type: 'CLEAR'
            })
            for (let i = 0; i < savedCart.cart.length; i++) {
                dispatch({
                    type: 'ADD',
                    payload: {
                        id: savedCart.cart[i].id,
                        quantity: savedCart.cart[i].quantity
                    }
                })
            }
        }
    },[])

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