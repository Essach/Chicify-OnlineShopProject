const { v4: uuidv4 } = require('uuid');

const { ids } = require('../AdditionalFiles/productsIds.js');

class Product {
    constructor(name, price, delivery, quantity, images, description, categories, sellerId) {
        this.ID = this.createId();
        this.addId(this.id)
        this.name = name;
        this.price = price;
        this.delivery = delivery;
        this.quantity = quantity;
        this.images = images;
        this.description = description;
        this.categories = categories;
        this.reviews = [];
        this.sellerId = sellerId;
    }

    createId() {
        let newId;
        do {
            newId = uuidv4();
        } while (ids.findIndex(item => item === newId) !== -1)
        return newId;
    }

    addId(id) {
        ids.push(id)
    }
}


// function addId(id) {
//     ids.append(id)
// }

module.exports = Product
