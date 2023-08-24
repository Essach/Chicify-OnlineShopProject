import { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        const { data } = await request.get('/products');
        
        setProducts(data.products);
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <StoreContext.Provider value={{
            products,
            setProducts,
            user,
            setUser,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

StoreProvider.propTypes = {
    children: PropTypes.object,
}

export default StoreProvider