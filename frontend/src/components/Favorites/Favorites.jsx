import './Favorites.scss';
import favoritesIcon from '../../icons/favoritesDBlue.svg';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request';
import ProductSquare from '../Product/Product';
import Login from '../Login/Login';
const Favorites = () => {
    const { user } = useContext(StoreContext)

    const [favoriteItems, setFavoriteItems] = useState([])

    const fetchFavorites = async () => {
        const favorites = [];
        for (let i = 0; i < user.favorites.length; i++) {
            const { status, data } = await request.get(`/products/${user.favorites[i]}`);
            if (status === 200) {
                favorites.push(data.product);
            } else {
                throw new Error(data.message);
            }
        }
        return favorites;
    }

    const createFavoriteItems = async () => {
        const favorites = await fetchFavorites()
        const favoriteItems = favorites.slice().reverse().map(favorite => <ProductSquare
            key={favorite.ID}
            id={favorite.ID}
            name={favorite.name}
            price={favorite.price}
            delivery={favorite.delivery}
            images={favorite.images}
            reviews={favorite.reviews}
            type='rectangleFavoritesPage'
        />)
        setFavoriteItems(favoriteItems);
    }

    useEffect(() => {
        if (user) {
            if (user.favorites.length > 0) {
                createFavoriteItems()
            } else {
                setFavoriteItems(<p className='addFavorites'>Add some products to favorites to see them there</p>)
            }
        }
    }, [user])
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenLogin = () => setIsModalOpen(true);
    const handleOnCloseLogin = () => setIsModalOpen(false);

    return (
        <>
            {user === null || user === undefined ?
                <login-request>
                    <p>Please login to see your favorites</p>
                    <login-btn onClick={handleOpenLogin}>Login</login-btn>
                    <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpen} />
                </login-request> :
                <favorites-page>
                    <f-title>
                        <img src={favoritesIcon} alt='favorites' />
                        <p>Favorites</p>
                    </f-title>
                    <f-content>
                        {favoriteItems}
                    </f-content>
                </favorites-page>
            }
        </>
    );
}

export default Favorites;