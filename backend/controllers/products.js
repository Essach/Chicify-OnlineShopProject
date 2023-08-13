const Review = require('../Classes/Review.js')
const Product = require('../Classes/Product.js')

const productsData = [
    new Product(),
    new Product(),
]

exports.getProducts = (request, responsem, next) => {
    try {
        response.status(200).json({
            products: productsData,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: "Couldn't receive products"
        });
    }
};

exports.getProduct = (request, response, next) => {
    try {
        const { id } = request.params;
        const productToSend = productsData.find(product => product.id === id);

        if (!productToSend) {
            response.status(404).json({
                message: "Couldn't find product of given id"
            });

            return;
        }

        response.status(200).json({
            product: productToSend,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: "Error with getting product"
        });
    }
}

exports.getProductReviews = (request, response, next) => {
    try {
        const { id } = request.params;
        const product = productsData.find(product => product.id === id);
        const reviewsToSend = product.reviews;

        if (!productToSend) {
            response.status(404).json({
                message: "Couldn't find product of given id"
            });

            return;
        }

        response.status(200).json({
            reviews: reviewsToSend,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: "Error with getting product"
        });
    }
};

exports.postProduct = (request, response, next) => {
    try {
        const { name, price, delivery, quantity, images, description, categories } = request.body;
        if (!name || !price || !delivery || !quantity || !images || !categories) {
            response.status(404).json({
                message: 'Not enough information was received'
            });

            return;
        }

        productsData.push(new Product(name, price, delivery, quantity, images, description, categories))

        response.status(200).json({
            products: productsData
        });

    } catch (error) {
        response.status(500).json({
            error,
            message: 'Error with posting product'
        });
    }
};

exports.postProductReview = (request, response, next) => {
    try {
        const { rating, description, productId } = request.body;
        const product = productsData.find(product => product.id = productId)

        if (!rating) {
            response.status(404).json({
                message: 'Rating for the review not given'
            });

            return;
        } else if (!product) {
            response.status(405).json({
                message: "Couldn't find product of given id"
            });

            return;
        }
        
        const newReview = new Review(rating, description);
        product.reviews.push(newReview);

        response.status(200).json({
            productReviews: product.reviews,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Error with posting review'
        });
    }
};

exports.putProductBySeller = (request, response, next) => {
    try {
        let { productId, newName, newPrice, newDelivery, newDescription, newImages } = request.body;

        const product = productsData.find(product => product.id = productId);

        if (!product) {
            response.status(404).json({
                message: "Couldn't find product of given id",
            });

            return;
        }
        if (newName) product.name = newName;
        if (newPrice) product.price = newPrice;
        if (newDelivery) product.delivery = newDelivery;
        if (newDescription) product.description = newDescription;
        if (newImages) product.images = newImages;

        response.status(200).json({
            product: product,
        });

    } catch (error) {
        response.status(500).json({
            error,
            message: 'Error with updating product'
        });
    }
}

exports.putProductBySystem = (request, response, next) => {
    try {
        const { productId, quantityToDelete } = request.body;

        const product = productsData.find(product => product.id = productId);

        if (!product) {
            response.status(404).json({
                message: "Couldn't find product of given id",
            });

            return;
        }

        if (quantityToDelete > product.quantity) {
            response.status(405).json({
                message: "Couldn't make purchase of more products than there are",
            });

            return;
        }

        product.quantity -= quantityToDelete;

        response.status(200).json({
            productQuantity: product.quantity,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Error with updating product quantity',
        });
    }
}

exports.deleteProduct = (request, response, next) => {
    try {
        const { id } = request.params;

        const indexProductToDelete = coursesData.findIndex(course => course.id === id);

        if (indexProductToDelete === -1) {
        response.status(404).json({
            message: "Couldn't find product of given id",
        });
        
        return;
        }

        productsDataData.splice(indexProductToDelete, 1);
        response.status(200).end();
    } catch (error) {
        response.status(500).json({
        error,
        message: 'Error with deleting product',
        });
    }
};

exports.productsData = productsData;
