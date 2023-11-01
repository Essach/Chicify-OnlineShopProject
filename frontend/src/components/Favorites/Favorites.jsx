import './Favorites.scss';
import favoritesIcon from '../../icons/favoritesDBlue.svg';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
const Favorites = () => {
    const { user } = useContext(StoreContext)

    const [favoriteItems, setFavoriteItems] = useState([])

    console.log(user.favorites)

    return (
        <favorites-page>
            <f-title>
                <img src={favoritesIcon} alt='favorites' />
                <p>Favorites</p>
            </f-title>
            <f-content>

            </f-content>
        </favorites-page>
    );
}

export default Favorites;