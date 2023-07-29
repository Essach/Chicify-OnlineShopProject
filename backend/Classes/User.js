
class User {
    constructor(accessLevel, login, password, orders, favoritesIds, userId) {
        this.accessLevel = accessLevel;
        this.login = login;
        this.password = password;
        this.orders = orders;
        this.favorites = favorites;
        this.userId = usedId;
    }

    becomeSeller() {
        this.accessLevel = 2
    }

}

export default User;