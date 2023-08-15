const { v4: uuidv4 } = require('uuid');

class Product {
    constructor(name, price, delivery, quantity, images, description, categories) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.delivery = delivery;
        this.quantity = quantity;
        this.images = images;
        this.description = description;
        this.categories = categories;
        this.reviews = [];
    }
}

module.exports = Product
