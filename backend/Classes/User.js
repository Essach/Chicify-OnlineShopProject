
class User {
    constructor(accessLevel, login, password, orders, favorites, userId) {
        this.accessLevel = accessLevel;
        this.login = login;
        this.password = password;
        this.orders = orders;
        this.favorites = favorites;
        this.userId = userId;
    }

    becomeSeller() {
        this.accessLevel = 2
    }

}

module.exports = User