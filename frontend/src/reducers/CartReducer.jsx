export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'DELETE':
            return { ...state, cart:state.cart.filter(c => c.id !== action.payload.id)}
        case 'EDIT':
            return { ...state, cart: state.cart.filter(c => c.id === action.payload.id ? c.quantity = action.payload.quantity : c.quantity) }
        case 'CLEAR': 
            return { ...state, cart: []}
        default:
            alert("Couldn't find the action type")
            return state;
    }
}