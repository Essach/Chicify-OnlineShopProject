const { v4: uuidv4 } = require('uuid');

class Payment {
    constructor(products, price, address, cardInfo) {
        this.id = uuidv4()
        this.products = products;
        this.price = price;
        this.address = address;
        this.cardInfo = cardInfo;
    }
}

module.exports = Payment