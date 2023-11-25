const Review = require('../Classes/Review.js')
const Product = require('../Classes/Product.js')

const productsData = [
    new Product(
        "Laptop",
        100,
        ["Standard", "Express"],
        10,
        [{ url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80' }],
        "Experience seamless multitasking and powerful computing with our cutting-edge laptop.",
        ["Electronics", "Computers"],
        '1'
    ),
    new Product(
        "Smartphone",
        100,
        ["Standard", "Express"],
        20,
        [{ url: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' }],
        "Stay connected in style with our advanced smartphone featuring cutting-edge technology.",
        ["Electronics", "Mobile"],
        '1'
    ),
    new Product(
        "Headphones",
        100,
        ["Standard", "Express"],
        100,
        [{ url: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80' }],
        "Immerse yourself in music with our high-quality headphones designed for audiophiles.",
        ["Electronics", "Audio"],
        '1'
    ),
    new Product(
        "Fitness Tracker",
        100,
        ["Standard", "Express"],
        50,
        [{ url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }],
        "Monitor your health and stay motivated with our feature-packed fitness tracker.",
        ["Electronics", "Fitness"],
        '1'
    ),
    new Product(
        "Cookware Set",
        100,
        ["Standard", "Express"],
        30,
        [{ url: 'https://images.unsplash.com/photo-1584990347449-fd98bc063110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80' }],
        "Elevate your cooking game with our professional-grade cookware set.",
        ["Home & Kitchen", "Cookware"],
        '1'
    ),
    new Product(
        "Backpack",
        100,
        ["Standard", "Express"],
        40,
        [{ url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' }],
        "Carry your essentials in style and comfort with our versatile backpack.",
        ["Fashion", "Accessories"],
        '1'
    ),
    new Product(
        "Gaming Console",
        100,
        ["Standard", "Express"],
        15,
        [{ url:'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'}],
        "Step into a world of gaming excitement with our high-performance gaming console.",
        ["Electronics", "Gaming"],
        '1'
    ),
    new Product(
        "Wireless Earbuds",
        50,
        ["Standard", "Express"],
        100,
        [{ url:'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}],
        "Experience true freedom with our high-quality wireless earbuds.",
        ["Electronics", "Audio"],
        '1'
    ),
    new Product(
        "Camera",
        300,
        ["Standard", "Express"],
        20,
        [{ url:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'}],
        "Capture life's moments in stunning detail with our advanced camera.",
        ["Electronics", "Photography"],
        '1'
    ),
    new Product(
        "Dumbbell Set",
        80,
        ["Standard", "Express"],
        50,
        [{ url:'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}],
        "Build strength and stay fit with our versatile dumbbell set.",
        ["Sports", "Fitness"],
        '1'
    ),
    new Product(
        "Coffee Maker",
        90,
        ["Standard", "Express"],
        30,
        [{ url:'https://images.unsplash.com/photo-1608354580875-30bd4168b351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'}],
        "Brew the perfect cup of coffee every time with our easy-to-use coffee maker.",
        ["Home & Kitchen", "Appliances"],
        '1'
    ),
    new Product(
        "Smart Watch",
        120,
        ["Standard", "Express"],
        60,
        [{ url:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'}],
        "Stay connected and track your health with our feature-rich smartwatch.",
        ["Electronics", "Wearable Tech"],
        '1'
    ),
    new Product(
        "Cooking Utensil Set",
        40,
        ["Standard", "Express"],
        40,
        [{ url:'https://images.unsplash.com/photo-1516824711718-9c1e683412ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'}],
        "Upgrade your kitchen arsenal with our durable cooking utensil set.",
        ["Home & Kitchen", "Cookware"],
        '1'
    ),
    new Product(
        "Hiking Backpack",
        70,
        ["Standard", "Express"],
        25,
        [{ url:'https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'}],
        "Embark on outdoor adventures with our rugged and spacious hiking backpack.",
        ["Sports", "Outdoor Gear"],
        '1'
    ),
    new Product(
        "Bluetooth Speaker",
        55,
        ["Standard", "Express"],
        80,
        [{ url:'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'}],
        "Enjoy powerful sound and wireless convenience with our Bluetooth speaker.",
        ["Electronics", "Audio"],
        '1'
    ),
    new Product(
        "Yoga Mat",
        25,
        ["Standard", "Express"],
        70,
        [{ url:'https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}],
        "Achieve tranquility and flexibility with our comfortable yoga mat.",
        ["Sports", "Fitness"],
        '1'
    ),
    new Product(
        "Desk Organizer",
        20,
        ["Standard", "Express"],
        40,
        [{ url:'https://images.unsplash.com/photo-1496128959656-addf33ffc2d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80'}],
        "Keep your workspace tidy and organized with our practical desk organizer.",
        ["Home & Kitchen", "Office Supplies"],
        '1'
    ),
]

exports.getProducts = (request, response, next) => {
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
        const productToSend = productsData.find(product => product.ID === id);

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
        const product = productsData.find(product => product.ID === id);

        if (!product) {
            response.status(404).json({
                message: "Couldn't find product of given id"
            });

            return;
        }

        response.status(200).json({
            reviews: product.reviews,
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

exports.putProductBySeller = (request, response, next) => {
    try {
        let { productId, newName, newPrice, newDelivery, newDescription, newImages } = request.body;

        const product = productsData.find(product => product.ID === productId);

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

        const product = productsData.find(product => product.ID === productId);

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

        const indexProductToDelete = coursesData.findIndex(course => course.ID === id);

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
