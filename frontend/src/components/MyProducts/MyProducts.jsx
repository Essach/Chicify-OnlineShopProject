import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Login from "../Login/Login";

import label from '../../icons/label.svg';
import NewProduct from "./subcomponents/NewProduct/NewProduct";

import './MyProducts.scss';
import { useNavigate } from "react-router";
import MyProduct from "./subcomponents/MyProduct/MyProduct";

const MyProducts = () => {
    const { user } = useContext(StoreContext);

    const navigate = useNavigate();

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const handleOpenLogin = () => setIsModalOpenLogin(true);
    const handleOnCloseLogin = () => setIsModalOpenLogin(false);

    const [isModalOpenSellProduct, setIsModalOpenSellProduct] = useState(false);

    const [myProductsItems, setMyProductsItems] = useState([]); 

    const handleStartSellingBtn = () => {
        if (user) {
            navigate('/selling-sign-in');
            window.scrollTo(0, 0);
        } else {
            setIsModalOpenLogin(true);
        }
    }

    useEffect(() => {
        if (user !== null && user !== undefined && user.accessLevel >= 2) {
            if (user.productsForSale.length > 0) {
                setMyProductsItems(user.productsForSale.map(product => <MyProduct key={product} id={product}/>))
            } else {
                setMyProductsItems(<p className='createProducts'>{`You don't have any products put up for sale yet`}</p>)
            }
        }
    },[user])

    return (
        <>
            {user === null || user === undefined ?
            <login-request>
                <p>Please login to see your products</p>
                <login-btn onClick={handleOpenLogin}>Login</login-btn>
                <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
            </login-request> :
            <>
                {user.accessLevel < 2 ? 
                <seller-request>
                    <p>{`Become a seller to start putting up products for sale`}</p>
                    <start-selling-btn onClick={handleStartSellingBtn}>
                        <p>Start selling</p>
                    </start-selling-btn>
                </seller-request> :
                <my-products-page>
                    <mp-title>
                        <img src={label} alt="label icon" />
                        <p>Your products</p>
                    </mp-title>
                    <sell-product-btn onClick={() => { setIsModalOpenSellProduct(true)}}>
                        Put up a new product for sale
                    </sell-product-btn>
                    <my-products>
                        {myProductsItems}
                    </my-products>
                    <NewProduct handleOnClose={(e, location) => {
                        if (e !== undefined) setIsModalOpenSellProduct(false);
                        else if (location === 'addBtn') setIsModalOpenLogin(false);
                        else if (location === 'closeBtn') setIsModalOpenLogin(false);
                    }} isOpen={isModalOpenSellProduct} openModal={() => {
                        setIsModalOpenSellProduct(true)
                    }} />
                </my-products-page> 
                }
            </>
            }
        </>
    );
}

export default MyProducts;