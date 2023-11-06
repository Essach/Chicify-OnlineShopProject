import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import ProductSquare from '../../Product/Product';

const SearchProducts = (props) => {
    const { viewMode, starFilter, priceBottom, priceTop, itemName } = props;
    const { products } = useContext(StoreContext);
    
    const [searchProducts, setSearchProducts] = useState([]);
    
    useEffect(() => {
        let searchProducts = products.filter(product => product.name.toLowerCase().includes(itemName));
        searchProducts = searchProducts.filter(product => product.price > priceBottom);
        if (priceTop !== '') searchProducts = searchProducts.filter(product => product.price < priceTop);

        let minStars = 0;
        if(starFilter === '5star') minStars = 5
        else if(starFilter === '4star') minStars = 4
        else if(starFilter === '3star') minStars = 3
        else if(starFilter === '2star') minStars = 2
        else if(starFilter === '1star') minStars = 1

        if (starFilter !== 'all' && starFilter !== 'any') {
            searchProducts = searchProducts.filter(p => (Math.round(p.reviews.reduce(
                (accumulator, review) => accumulator + review.rating, 0
            ) / p.reviews.length)) >= minStars);
        }

        const searchProductsItems = searchProducts.map(sp => <ProductSquare
            key={sp.ID}
            id={sp.ID}
            name={sp.name}
            price={sp.price}
            delivery={sp.delivery}
            images={sp.images}
            reviews={sp.reviews}
            type={'rectangleProductPage'} />);

        setSearchProducts(searchProductsItems);
    },[itemName, starFilter, priceBottom, priceTop, viewMode, products])

    // console.log(searchProducts[0])

    return (
        <search-products>
            {searchProducts}
        </search-products>
    );
}

SearchProducts.propTypes = {
    viewMode: PropTypes.string,
    starFilter: PropTypes.string,
    priceBottom: PropTypes.string,
    priceTop: PropTypes.string,
    itemName: PropTypes.string,
}

export default SearchProducts;