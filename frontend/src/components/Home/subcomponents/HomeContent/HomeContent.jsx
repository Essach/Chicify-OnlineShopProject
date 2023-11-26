import ProductsPanel from "./ProductsPanel/ProductsPanel";
import AdPanel from "./AdPanel/AdPanel";

import { StoreContext } from "../../../../store/StoreProvider";
import { useContext } from "react";

import './HomeContent.scss';

const HomeContent = () => {
    const { products, languageMode } = useContext(StoreContext);

    return (
        <home-content>
            <ProductsPanel title={languageMode === 'en' ? 'Recommended for you' : 'Polecane dla Ciebie'} productsData={products.slice(0,5)} />
            <AdPanel imageUrl='http://localhost:8000/images/ad/1.jpg' title={languageMode === 'en' ? 'Mega sales | Up to 70%' : 'Mega wyprzedaż | Do 70%'} />
            <ProductsPanel title={languageMode === 'en' ? 'New in our offer' : 'Nowe w naszej ofercie'} productsData={products.slice(5,10)} />
            <AdPanel imageUrl='http://localhost:8000/images/ad/2.jpg' title={languageMode === 'en' ? 'Popular now' : 'Na czasie' } />
            <ProductsPanel title={languageMode === 'en' ? 'Recommended for you' : 'Polecane dla Ciebie'} productsData={products.slice(10,15)} />
            <AdPanel imageUrl='http://localhost:8000/images/ad/3.jpg' title={languageMode === 'en' ? 'Mega sales | Up to 70%' : 'Mega wyprzedaż | Do 70%'} />
        </home-content>
    );
}

export default HomeContent;