import { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

import PropTypes from 'prop-types';

import { getUserInfo } from "../helpers/localStorage";


export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState();

    const fetchData = async () => {
        const { data } = await request.get('/products');
        
        setProducts(data.products);
    };

    useEffect(() => {
        fetchData()
        if (getUserInfo().length === undefined) {
            setUser(getUserInfo());
        }
        
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