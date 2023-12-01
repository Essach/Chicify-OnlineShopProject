const Product = require('../Classes/Product.js')
const { db } = require('../config/firebase.js');
const { getDocs, collection, getDoc, doc, addDoc } = require('firebase/firestore');


exports.getProducts = async (request, response, next) => {
    try {
        const productsCollectionRef = collection(db, "products");
        const data = await getDocs(productsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        response.status(200).json({
            products: filteredData,
        });

        return
    } catch (error) {
        response.status(500).json({
            error,
            message: "Couldn't receive products"
        });

        return
    }
};

exports.getProduct = async (request, response, next) => {
    try {
        const { id } = request.params;

        const productRef = doc(db, "products", id);
        const product = await getDoc(productRef);
        const productFiltered = { ...product.data(), id: product.id }
        
        if (productFiltered.name === undefined) {
            response.status(404).json({
                message: "Couldn't find product of given id"
            });

            return;
        }

        response.status(200).json({
            product: productFiltered,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: "Error with getting product"
        });
    }
}

exports.getProductReviews = async (request, response, next) => {
    try {
        const { id } = request.params;
        const productRef = doc(db, "products", id);
        const product = await getDoc(productRef);
        const productFiltered = { ...product.data(), id: product.id }

        if (!productFiltered) {
            response.status(404).json({
                message: "Couldn't find product of given id"
            });

            return;
        }

        response.status(200).json({
            reviews: productFiltered.reviews,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: "Error with getting product"
        });
    }
};

// exports.postProduct = async (request, response, next) => {
//     try {
//         const { name, price, delivery, quantity, images, description, categories } = request.body;
//         if (!name || !price || !delivery || !quantity || !images || !categories) {
//             response.status(404).json({
//                 message: 'Not enough information was received'
//             });

//             return;
//         }

//         const newDelivery = []
//         if (delivery.find(item => item === "Standard") !== undefined) newDelivery.push({type: "Standard", price: 3})
//         if (delivery.find(item => item === "Express") !== undefined) newDelivery.push({ type: "Express", price: 8 })
        
//         const productsCollectionRef = collection(db, "products");
//         await addDoc(productsCollectionRef, {
//             name,
//             price,
//             delivery : newDelivery,
//             quantity,
//             images,
//             description,
//             categories
//         })

//         const data = await getDocs(productsCollectionRef);
//         const filteredData = data.docs.map((doc) => ({
//             ...doc.data(),
//             id: doc.id
//         }));

//         response.status(200).json({
//             products: filteredData
//         });

//     } catch (error) {
//         response.status(500).json({
//             error,
//             message: 'Error with posting product'
//         });
//     }
// };

// exports.putProductBySeller = (request, response, next) => {
//     try {
//         let { productId, newName, newPrice, newDelivery, newDescription, newImages } = request.body;

//         const product = productsData.find(product => product.ID === productId);

//         if (!product) {
//             response.status(404).json({
//                 message: "Couldn't find product of given id",
//             });

//             return;
//         }
//         if (newName) product.name = newName;
//         if (newPrice) product.price = newPrice;
//         if (newDelivery) product.delivery = newDelivery;
//         if (newDescription) product.description = newDescription;
//         if (newImages) product.images = newImages;

//         response.status(200).json({
//             product: product,
//         });

//     } catch (error) {
//         response.status(500).json({
//             error,
//             message: 'Error with updating product'
//         });
//     }
// }

// exports.putProductBySystem = (request, response, next) => {
//     try {
//         const { productId, quantityToDelete } = request.body;

//         const product = productsData.find(product => product.ID === productId);

//         if (!product) {
//             response.status(404).json({
//                 message: "Couldn't find product of given id",
//             });

//             return;
//         }

//         if (quantityToDelete > product.quantity) {
//             response.status(405).json({
//                 message: "Couldn't make purchase of more products than there are",
//             });

//             return;
//         }

//         product.quantity -= quantityToDelete;

//         response.status(200).json({
//             productQuantity: product.quantity,
//         });
//     } catch (error) {
//         response.status(500).json({
//             error,
//             message: 'Error with updating product quantity',
//         });
//     }
// }

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
