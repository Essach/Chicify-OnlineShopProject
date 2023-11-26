import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Login from "../Login/Login";

import label from '../../icons/label.svg';
import NewProduct from "./subcomponents/NewProduct/NewProduct";

import './MyProducts.scss';
import { useNavigate } from "react-router";
import MyProduct from "./subcomponents/MyProduct/MyProduct";
import EditProduct from "./subcomponents/EditProduct/EditProduct";

const MyProducts = () => {
    const { user, languageMode } = useContext(StoreContext);

    const navigate = useNavigate();

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const handleOpenLogin = () => setIsModalOpenLogin(true);
    const handleOnCloseLogin = () => setIsModalOpenLogin(false);

    const [isModalOpenSellProduct, setIsModalOpenSellProduct] = useState(false);

    const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState(false);
    const [editId, setEditId] = useState('');
    
    const handleEditProduct = (id) => {
        setEditId(id);
        setIsModalOpenEditProduct(true);
    }

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
                setMyProductsItems(user.productsForSale.map(product => <MyProduct key={product} handleEditProduct={handleEditProduct} id={product}/>))
            } else {
                setMyProductsItems(<p className='createProducts'>{languageMode === 'en' ? `You don't have any products put up for sale yet` : 'Nie masz jeszcze żadnych produktów na sprzedaż'}</p>)
            }
        }
    },[user, editId])

    return (
        <>
            {user === null || user === undefined ?
            <login-request>
                <p>{languageMode === 'en' ? 'Please login to see your products' : 'Zaloguj się, aby zobaczyć swoje produkty'}</p>
                <login-btn onClick={handleOpenLogin}>{languageMode === 'en' ? 'Login' : 'Zaloguj się'}</login-btn>
                <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpenLogin} />
            </login-request> :
            <>
                {user.accessLevel < 2 ? 
                <seller-request>
                    <p>{languageMode === 'en' ? `Become a seller to start putting up products for sale` : 'Zostań sprzedawcą, aby zacząć sprzedawać'}</p>
                    <start-selling-btn onClick={handleStartSellingBtn}>
                    <p>{languageMode === 'en' ? 'Start selling' : 'Zacznij sprzedawać'}</p>
                    </start-selling-btn>
                </seller-request> :
                <my-products-page>
                    <mp-title>
                        <img src={label} alt="label icon" />
                        <p>{languageMode === 'en' ? 'My products' : 'Moje produkty'}</p>
                    </mp-title>
                    <sell-product-btn onClick={() => { setIsModalOpenSellProduct(true)}}>
                        {languageMode === 'en' ? 'Put up a new product for sale' : 'Wystaw nowy produkt na sprzedaż'}
                    </sell-product-btn>
                    <my-products>
                        {myProductsItems}
                    </my-products>
                    <NewProduct handleOnClose={(e, location) => {
                        if (e !== undefined) setIsModalOpenSellProduct(false);
                        else if (location === 'addBtn') setIsModalOpenSellProduct(false);
                        else if (location === 'closeBtn') setIsModalOpenSellProduct(false);
                    }} isOpen={isModalOpenSellProduct}/>
                    <EditProduct handleOnClose={(e, location) => {
                        if (e !== undefined) setIsModalOpenEditProduct(false);
                        else if (location === 'addBtn') setIsModalOpenEditProduct(false);
                        else if (location === 'closeBtn') setIsModalOpenEditProduct(false);
                    }} isOpen={isModalOpenEditProduct} id={editId} resetEditId={()=>{setEditId('')}} />
                </my-products-page>
                }
            </>
            }
        </>
    );
}

export default MyProducts;