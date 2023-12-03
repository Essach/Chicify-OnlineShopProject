import ProductsPanel from "./ProductsPanel/ProductsPanel";
import AdPanel from "./AdPanel/AdPanel";

import { StoreContext } from "../../../../store/StoreProvider";
import { useContext, useEffect, useState } from "react";

import './HomeContent.scss';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../../firebase";

const HomeContent = () => {
    const { products, languageMode } = useContext(StoreContext);

    const [imageLinks, setImageLinks] = useState([])

    useEffect(() => {
        const listRef = ref(storage, 'chicifyImages/ads');
        listAll(listRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageLinks((prev)=>[...prev, url])
                })
            })
        })
    },[])

    return (
        <home-content>
            {products?.length > 0 ? <ProductsPanel title={languageMode === 'en' ? 'Recommended for you' : 'Polecane dla Ciebie'} productsData={products.slice(0, 5)} /> : null }
            {imageLinks[0] !== undefined && <AdPanel imageUrl={imageLinks[0]} title={languageMode === 'en' ? 'Mega sales | Up to 70%' : 'Mega wyprzedaż | Do 70%'} />}
            {products?.length > 0 ? <ProductsPanel title={languageMode === 'en' ? 'New in our offer' : 'Nowe w naszej ofercie'} productsData={products.slice(5,10)} /> : null }
            {imageLinks[1] !== undefined && <AdPanel imageUrl={imageLinks[1]} title={languageMode === 'en' ? 'Popular now' : 'Na czasie'} />}
            {products?.length > 0 ? <ProductsPanel title={languageMode === 'en' ? 'Recommended for you' : 'Polecane dla Ciebie'} productsData={products.slice(10,15)} /> : null }
            {imageLinks[2] !== undefined && <AdPanel imageUrl={imageLinks[2]} title={languageMode === 'en' ? 'Mega sales | Up to 70%' : 'Mega wyprzedaż | Do 70%'} />}
        </home-content>
    );
}

export default HomeContent;