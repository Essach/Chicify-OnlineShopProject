const { v4: uuidv4 } = require('uuid');

// const createNewId = () => {
//     let newId = Math.random().toFixed(5) * 100000;
//     while (productsIds.findIndex(newId) !== -1) {
//         newId += 1;
//     }
//     if (newId.toString().length() > 5) {
//         throw new Error('Database ran out of or will soon run out of new ids')
//     }

//     productsIds.push(newId);
//     return newId
// }

class Product {
    constructor(name, price, delivery, quantity, images, description, categories) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.delivery = delivery;
        this.quantity = quantity;
        this.images = images;
        this.description = description;
        this.categories = categories
        this.reviews = []
    }
}

module.exports = Product
