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