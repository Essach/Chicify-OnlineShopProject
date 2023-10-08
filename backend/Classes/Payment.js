const { v4: uuidv4 } = require('uuid');

class Payment {
    constructor(id, products, price, address, cardInfo) {
        this.id = id;
        this.products = products;
        this.price = price;
        this.address = address;
        this.cardInfo = cardInfo;
    }
}

module.exports = Payment