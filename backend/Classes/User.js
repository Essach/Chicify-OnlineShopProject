
class User {
    constructor(accessLevel, username, phoneNumber = '', emailAddress = '', password, orders, favorites, userId) {
        this.accessLevel = accessLevel;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
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