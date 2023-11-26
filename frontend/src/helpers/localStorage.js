export const getAutocompleteSaved = () => localStorage.getItem("autocompleteSaved")?JSON.parse(localStorage.getItem("autocompleteSaved")):[];

export const addToSearchHistory = (id, name, link, autocompleteSaved) => {
    const searchResult = {id,name,link};
    autocompleteSaved.push(searchResult);
    localStorage.setItem("autocompleteSaved", JSON.stringify(autocompleteSaved));
    
}

export const removeFromSearchHistory = (id, autocompleteSaved) => {
    autocompleteSaved = autocompleteSaved.filter(item => item.id !== id);
    localStorage.setItem('autocompleteSaved', JSON.stringify(autocompleteSaved));
}

export const getCartSaved = () => localStorage.getItem('cartSaved') ? JSON.parse(localStorage.getItem('cartSaved')) : [];

export const changeCart = (newCart) => {
    localStorage.setItem('cartSaved', JSON.stringify(newCart));
}

export const getUserInfo = () => localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

export const updateUser = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export const logoutUser = () => {
    localStorage.setItem('userInfo', JSON.stringify([]));
}

export const getLanguageMode = () => JSON.parse(localStorage.getItem('languageMode'));

export const toggleLanguageMode = () => {
    if (getLanguageMode() === 'en') localStorage.setItem('languageMode', JSON.stringify('pl'))
    else localStorage.setItem('languageMode', JSON.stringify('en'))
}