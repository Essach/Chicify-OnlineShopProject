import { changeCart } from "../helpers/localStorage";

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            let newCart = { ...state, cart: [...state.cart, action.payload] };
            changeCart(newCart);
            return newCart
        }
        case 'DELETE': {
            let newCart = { ...state, cart: state.cart.filter(c => c.id !== action.payload.id) };
            changeCart(newCart);
            return newCart
        }
        case 'EDIT': {
            let newCart = { ...state, cart: state.cart.filter(c => c.id === action.payload.id ? c.quantity = action.payload.quantity : c.quantity) };
            changeCart(newCart);
            return newCart
        }
        case 'CLEAR': {
            let newCart = { ...state, cart: [] };
            changeCart(newCart);
            return newCart;
        }
        default:
            alert("Couldn't find the action type")
            return state;
    }
}