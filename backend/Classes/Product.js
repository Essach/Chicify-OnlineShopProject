const { v4: uuidv4 } = require('uuid');

const { ids } = require('../AdditionalFiles/productsIds.js');

class Product {
    constructor(name, price, delivery, quantity, images, description, categories, sellerId) {
        this.name = name;
        this.price = price;
        this.delivery = this.createDeliveries(delivery);
        this.quantity = quantity;
        this.images = images;
        this.description = description;
        this.categories = categories;
        this.reviews = [];
        this.sellerId = sellerId;
    }

    createDeliveries(deliveryOptions) {
        const delivery = []
        if(deliveryOptions.find(item => item === "Standard") !== undefined) delivery.push({type: "Standard", price: 3})
        if(deliveryOptions.find(item => item === "Express") !== undefined) delivery.push({type: "Express", price: 8})
        return (delivery);
    }

    editProduct(name, price, delivery, quantity, images, description, categories) {
        this.name = name;
        this.price = price;
        this.delivery = this.createDeliveries(delivery);
        this.quantity = quantity;
        this.images = images;
        this.description = description;
        this.categories = categories;
    }

    deleteProduct() {
        this.quantity = 0;
        this.categories = []
    }
}

module.exports = Product
