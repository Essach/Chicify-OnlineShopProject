
class User {
    constructor(accessLevel, login, password, ordersIds, favoritesIds) {
        this.accessLevel = accessLevel;
        this.login = login;
        this.password = password;
        this.ordersIds = ordersIds;
        this.favoritesIds = favoritesIds;
    }
}

export default User;