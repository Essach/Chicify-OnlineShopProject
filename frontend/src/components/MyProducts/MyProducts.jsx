import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Login from "../Login/Login";

import label from '../../icons/label.svg';
import NewProduct from "./subcomponents/newProduct/newProduct";

const MyProducts = () => {
    const { user } = useContext(StoreContext);

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const handleOpenLogin = () => setIsModalOpenLogin(true);
    const handleOnCloseLogin = () => setIsModalOpenLogin(false);

    const [isModalOpenSellProduct, setIsModalOpenSellProduct] = useState(false);

    const handleSellProductBtn = () => {
        console.log('')
    }

    useEffect(() => {
        if (user !== null && user !== undefined && user.productsForSale.length > 0) {
            return;
        }
    },[user])

    return (
        <>
            {user === null || user === undefined ?
            <login-request>
                <p>Please login to see your orders</p>
                <login-btn onClick={handleOpenLogin}>Login</login-btn>
                <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
            </login-request> :
            <my-products-page>
                <mp-title>
                    <img src={label} alt="label icon" />
                    <p>Your products</p>
                </mp-title>
                    <sell-product-btn onClick={() => { setIsModalOpenSellProduct(true)}}>
                    Put up a new product for sale
                </sell-product-btn>
                <my-products>
                    
                </my-products>
                    <NewProduct handleOnClose={() => { setIsModalOpenSellProduct(false) }} isOpen={isModalOpenSellProduct} openModal={() => {
                        setIsModalOpenSellProduct(true)
                        console.log("here")
                    }} />
            </my-products-page>
            }
        </>
    );
}

export default MyProducts;