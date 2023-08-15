import ProductsPanel from "./ProductsPanel/ProductsPanel";
import AdPanel from "./AdPanel/AdPanel";

import { StoreContext } from "../../../../store/StoreProvider";
import { useContext } from "react";

import './HomeContent.scss';

const HomeContent = () => {
    const { products } = useContext(StoreContext);
    return (
        <home-content>
            <ProductsPanel title='Recommended for you' productsData={products.slice(0,5)} />
            <AdPanel imageUrl='http://localhost:8000/images/ad/1.jpg' title='Mega sales | Up to 70%' />
            <ProductsPanel title='New in our offer' productsData={products.slice(5,10)} />
            <AdPanel imageUrl='http://localhost:8000/images/ad/2.jpg' title='Popular now' />
            <ProductsPanel title='Recommended for you' productsData={products.slice(10,15)} />
            <AdPanel imageUrl='http://localhost:8000/images/ad/3.jpg' title='Mega sales | Up to 70%' />
        </home-content>
    );
}

export default HomeContent;