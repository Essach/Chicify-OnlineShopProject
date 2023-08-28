const { v4: uuidv4 } = require('uuid');
class User {
    constructor(accessLevel, username, phoneNumber = '', emailAddress = '', password, orders, favorites) {
        this.accessLevel = accessLevel;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.password = password;
        this.orders = orders;
        this.favorites = favorites;
        this.userId = uuidv4();
    }

    becomeSeller() {
        this.accessLevel = 2
    }

}

module.exports = User