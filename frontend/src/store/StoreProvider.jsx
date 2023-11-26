import { createContext, useEffect, useRef, useState } from "react";
import request from "../helpers/request";

import PropTypes from 'prop-types';

import { getLanguageMode, getUserInfo, updateUser } from "../helpers/localStorage";


export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState();

    const userInterval = useRef();

    const fetchData = async () => {
        const { data } = await request.get('/products');
        
        setProducts(data.products);
    };

    const updateUserData = async (loginType, emailOrPhoneNumberValue, passwordValue) => {
        const { data, status } = await request.post(
            '/users/login',
            { loginType: loginType, login: emailOrPhoneNumberValue, password: passwordValue },
        );

        if (status === 200) {
            updateUser(data.user);
            setUser(data.user);
        }
    }

    const languageMode = getLanguageMode();

    useEffect(() => {
        if(getLanguageMode() === undefined) localStorage.setItem('languageMode', JSON.stringify('en'))
        fetchData()
        if (getUserInfo().length === undefined) {
            const currUser = getUserInfo();
            setUser(currUser);

            let loginType;
            let emailOrPhoneNumberValue;
            if (currUser.emailAddress !== "") {
                loginType = "emailAddress";
                emailOrPhoneNumberValue = currUser.emailAddress
            } else if (currUser.phoneNumber !== "") {
                loginType = "phoneNumber";
                emailOrPhoneNumberValue = currUser.phoneNumber;
            }
            userInterval.current = setInterval(()=>{updateUserData(loginType, emailOrPhoneNumberValue, currUser.password)},10000)
        }
        
        return () => {
            clearInterval(userInterval.current)
        }
        
    }, []);

    return (
        <StoreContext.Provider value={{
            products,
            setProducts,
            user,
            setUser,
            userInterval,
            languageMode,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

StoreProvider.propTypes = {
    children: PropTypes.object,
}

export default StoreProvider