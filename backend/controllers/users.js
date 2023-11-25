const User = require('../Classes/User.js');
const BotUser = require('../Classes/BotUser.js');
const { productsData } = require('./products.js');
const Product = require('../Classes/Product.js');
const Review = require('../Classes/Review.js');

const { storage, firebaseConfig } = require('../firebase.js');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const { v4 } = require('uuid');
const { initializeApp } = require("firebase/app");
initializeApp(firebaseConfig);

const usersData = [
    new User(
        1,
        'User',
        '123456789',
        '',
        '123',
        [],
        [],
    ),
    new User(
        3,
        'Essach',
        '',
        'mymail@gmail.com',
        '***',
        [],
        [],
    ),
    new BotUser("1", "Chicify Online Shop", "111111111", ""),
    new BotUser("2", "Test User", "123123123", ""),
]

const uploadImagesAndGetURLs = (imageList) => {
    const promises = imageList.map((imageUpload) => {
        return new Promise((resolve, reject) => {
            const filePath = `${imageUpload.originalname + v4()}`
            const imageRef = ref(storage, `images/${filePath}`);
            const metadata = {
                contentType: imageUpload.mimetype,
            }
            uploadBytes(imageRef, imageUpload.buffer, metadata)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            resolve({url: url, filePath: filePath});
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });

    return Promise.all(promises);
};

const deleteImages = (imageFilePaths) => {
    const promises = imageFilePaths.map((filePath) => {
        return new Promise((resolve, reject) => {
            const imageRef = ref(storage, `images/${filePath}`)
            deleteObject(imageRef)
                .then(() => {
                    console.log('file deleted')
                    resolve();
                })
                .catch((error) => {
                    console.log('file not deleted')
                    reject(error);
                })
        })
    })

}

exports.postUserCreate = (request, response, next) => {
    try {
        const { username, phoneNumber, emailAddress, password } = request.body;

        const newUser = new User(1, username, phoneNumber, emailAddress, password, [], []);
        usersData.push(newUser);

        response.status(200).json({
            message: 'account created'
        })
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Internal server error'
        })
    }

}

exports.postUserLogin = (request, response, next) => {
    try {
        const { loginType, login ,password } = request.body;

        let user;
        if (loginType === 'phoneNumber') {
            user = usersData.find(u => u.phoneNumber === login);
        } else if (loginType === 'emailAddress') {
            user = usersData.find(u => u.emailAddress === login);
        }

        if (!user) {
            response.status(404).json({
                message: 'Couldnt find requested user',
            });

            return;
        }

        const isPasswordCorrect = user.password === password;
        if (!isPasswordCorrect) {
            response.status(405).json({
                message: 'Invalid login or password',
            })

            return;
        }


        response.status(200).json({
            user,
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Code error',
        });
    }
};

exports.postUserDeleteProduct = async (request, response, next) => {
    try {

        const sellerId = request.body.sellerId;
        const productId = request.body.productId;

        const user = usersData.find(user => user.userId === sellerId);
        const product = productsData.find(product => product.ID === productId)
        
        if (!user) {
            response.status(404).json({
                message: "Couldn't find user with given id",
            })

            return;
        }
        if (!product) {
            response.status(404).json({
                message: "Couldn't find product with given id",
            })

            return;
        }
        if (user.accessLevel < 2) {
            response.status(404).json({
                message: "User with given id isn't a seller",
            })

            return;
        }
        
        const productIndexInUser = user.productsForSale.findIndex(product => product === productId);
        if (productIndexInUser === -1) {
            response.status(404).json({
                message: "User isn't a seller of requested product",
            })

            return;
        }

        product.deleteProduct();
        user.productsForSale.splice(productIndexInUser, 1);

        response.status(200).json({
            user,
        })

        return;

    } catch (error) {
        console.log(error);

        response.status(500).json({
            error,
            message: "Internal server error",
        })

        return;
    }
}

exports.postUserEditProduct = async (request, response, next) => {
    try {
        const name = request.body.name;
        const price = request.body.price;
        const quantity = request.body.quantity;
        const description = request.body.description;
        const sellerId = request.body.sellerId;
        const productId = request.body.productId;

        let delivery = [];
        Object.keys(request.body).forEach((key) => {
            if (key.startsWith('delivery')) {
                const value = request.body[key];

                delivery.push(value)
            }
        });
        delivery = delivery[0]

        let categories = [];
        Object.keys(request.body).forEach((key) => {
            if (key.startsWith('category')) {
                const value = request.body[key];

                categories.push(value)
            }
        });
        categories = categories[0];

        let imageFilePaths = [];
        Object.keys(request.body).forEach((key) => {
            if (key.startsWith('imageFilePath')) {
                const value = request.body[key];

                imageFilePaths.push(value)
            }
        });

        let imageList = [];
        for (let i = 0; i < request.files.length; i++){
            imageList.push(request.files[i]);
        }

        const user = usersData.find(user => user.userId === sellerId);
        const product = productsData.find(product => product.ID === productId);
        
        if (!user) {
            response.status(404).json({
                message: "Couldn't find user with given id",
            })

            return;
        }
        if (!product) {
            response.status(404).json({
                message: "Couldn't find product with given id",
            })

            return;
        }
        if (user.accessLevel < 2) {
            response.status(404).json({
                message: "User with given id isn't a seller",
            })

            return;
        }
        if (!user.productsForSale.find(product => product === productId)) {
            response.status(404).json({
                message: "User isn't a seller of requested product",
            })

            return;
        }

        await deleteImages(imageFilePaths);

        const imagesLinksAndPaths = await uploadImagesAndGetURLs(imageList);

        product.editProduct(name, parseInt(price), delivery, parseInt(quantity), imagesLinksAndPaths, description, categories)

        response.status(200).json({
            user,
        })

        return;

    } catch (error) {
        console.log(error);

        response.status(500).json({
            error,
            message: "Internal server error",
        })

        return;
    }
}

exports.postUserSellProduct = async (request, response, next) => {
    try {
        const name = request.body.name;
        const price = request.body.price;
        const quantity = request.body.quantity;
        const description = request.body.description;
        const sellerId = request.body.sellerId;

        let delivery = [];
        Object.keys(request.body).forEach((key) => {
            if (key.startsWith('delivery')) {
                const value = request.body[key];

                delivery.push(value)
            }
        });
        delivery = delivery[0]

        let categories = [];
        Object.keys(request.body).forEach((key) => {
            if (key.startsWith('category')) {
                const value = request.body[key];

                categories.push(value)
            }
        });
        categories = categories[0];

        let imageList = [];
        for (let i = 0; i < request.files.length; i++){
            imageList.push(request.files[i]);
        }
        

        const user = usersData.find(user => user.userId === sellerId);

        if (!user) {
            response.status(404).json({
                message: "Couldn't find user with given id",
            })

            return;
        }

        const imagesLinksAndPaths = await uploadImagesAndGetURLs(imageList);

        const newProduct = new Product(name, parseInt(price), delivery, parseInt(quantity), imagesLinksAndPaths, description, categories, sellerId);
        user.putProductForSale(newProduct.ID);
        productsData.push(newProduct);


        response.status(200).json({
            user,
        })

        return;

    } catch (error) {
        console.log(error);

        response.status(500).json({
            error,
            message: "Internal server error",
        })

        return;
    }
}

exports.postReview = (request, response, next) => {
    try {
        const { rating, comment, productId, userId } = request.body;
        const product = productsData.find(product => product.ID === productId);
        const user = usersData.find(user => user.userId === userId);

        if (rating === undefined || userId === undefined) {
            response.status(404).json({
                message: 'Not enough information provided'
            });

            return;
        } else if (!product) {
            response.status(405).json({
                message: "Couldn't find product with given id"
            });

            return;
        } else if (!user) {
            response.status(406).json({
                message: "Couldn't find user with given id"
            });

            return;
        }
        
        const newReview = new Review(rating, comment, userId);
        product.reviews.push(newReview);
        user.sendReview(productId);

        response.status(200).json({
            user: user
        });
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Internal server error'
        });
    }
}

exports.patchUserOrder = (request, response, next) => {
    try {
        const { products, price, userId, paymentId, productBySeller } = request.body;

        const user = usersData.find(user => user.userId === userId);

        const productBySellerFixed = productBySeller.filter(item => item.sellerId !== undefined)
        let areSellersValid = true;
        for (let i = 0; i < productBySellerFixed.length; i++) {
            if (!usersData.find(user => user.userId === productBySellerFixed[i].sellerId)) areSellersValid = false;
        }

        if (!user || !areSellersValid) {
            response.status(404).json({
                message: "Couldn't find the user with given id"
            });

            return;
        }

        const order = { products: products, price: price, paymentId: paymentId };
        user.orders.push(order);
        
        for (let i = 0; i < products.length; i++) {
            const productToUpdate = productsData.find(product => product.id = products[i].id);
            if (!productToUpdate) {
                throw new Error("Couldn't update products quantity");
            } else {
                productToUpdate.quantity -= products[i].quantity;
            }
        }

        productBySellerFixed.forEach((item) => {
            const seller = usersData.find(user => user.userId === item.sellerId);
            user.receiveMessage(item.sellerId, `Thank you for purchasing ${item.productName}`);
            seller.sendMessage(userId, `Thank you for purchasing ${item.productName}`)
        })


        response.status(200).json({
            user
        })
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Problem with ordering'
        })
    }
}

exports.patchSendMessage = (request, response, next) => {
    try {
        const { senderId, recipientId, content } = request.body;

        const sender = usersData.find(user => user.userId === senderId);
        const recipient = usersData.find(user => user.userId === recipientId);

        if (sender === undefined) {
            response.status(404).json({
                message: "Couldn't find the sender's account"
            })

            return;
        }

        sender.sendMessage(recipientId, content)
        if (recipient !== undefined) {
            if (recipientId === "1" || recipientId === "2") {
                sender.receiveMessage(recipientId, "This is an automatically generated response");
            } else {
                recipient.receiveMessage(senderId, content);
            }
        } else {
            response.status(405).json({
                message: "Couldn't find the recipient's account"
            })

            return;
        }

        response.status(200).json({
            user: sender
        })
        
        return;

    } catch (error) {
        response.status(500).json({
            error,
            message: "Internal code error"
        })
    }
}

const ADDFAVORITE = 'add';
const REMOVEFAVORITE = 'remove';

exports.patchUserFavorite = (request, response, next) => {
    try {
        const { userId, productId, action } = request.body;

        const user = usersData.find(user => user.userId === userId);
        if (!user) {
            response.status(404).json({
                message: "Couldn't find user with given id",
            });

            return;
        }

        let userUpdated
        if (action === ADDFAVORITE) {
            user.favorites.push(productId);
            // userUpdated = { ...user, favorites: [...user.favorites, productId]};
        } else if (action === REMOVEFAVORITE) {
            const favoriteIndex = user.favorites.findIndex(item => item === productId);
            user.favorites.splice(favoriteIndex, 1);
            // userUpdated = { ...user, favorites: user.favorites.filter(favoriteId => favoriteId !== productId)};
        } else {
            response.status(405).json({
                message: 'Unknown action'
            })
        }

        response.status(200).json({
            user
        });

        return;

    } catch (error) {
        response.status(500).json({
            error,
            message: 'Problem changing favorites'
        })
    }
}

exports.patchUserSeller = (request, response, next) => {
    try {
        const { id, name, country, city, street, postal, accountNumber } = request.body;
        const userToUpdate = usersData.find(user => user.userId === id);
        
        if (!userToUpdate) {
            response.status(404).json({
                message: "Couldn't find the user with given id",
            });

            return;
        } else if (userToUpdate.accessLevel !== 1) {
            response.status(405).json({
                message: 'Only users with basic access level can become a seller',
            });

            return;
        }

        userToUpdate.becomeSeller(name, accountNumber, `${country}, ${city}, ${street}, ${postal}`)

        response.status(200).json({
            user: userToUpdate,
        })

    } catch (error) {
        response.status(500).json({
            error,
            message: 'Error with making user a seller'
        })
    }
}

exports.patchUserPassword = (request, response, next) => {
    try {
        const { loginType, login, newPassword } = request.body;
        
        let user;
        if (loginType === 'phoneNumber') {
            user = usersData.find(u => u.phoneNumber === login);
        } else if (loginType === 'emailAddress') {
            user = usersData.find(u => u.emailAddress === login);
        }

        if (!user) {
            response.status(404).json({
                message: "Couldn't find requested user",
            });

            return;
        }

        user.changePassword(newPassword);

        response.status(200).json({
            message: 'password updated'
        });

    } catch (error) {
        response.status(500).json({
            error,
            message: 'Internal server error',
        })
    }
}

exports.getUserName = (request, response, next) => {
    try {
        const { id } = request.params;

        const user = usersData.find(user => user.userId === id)

        if (user === undefined || (user !== undefined && user.username === '')) {
            response.status(404).json({
                message: "Couldn't find user or user doesn't have an username",
            })

            return;
        };

        response.status(200).json({
            username: user.username,
        })
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Internal server error',
        })
    }
}

exports.getUsers = (request, response, next) => {
    try {
        const userEmails = usersData.map(user => user.emailAddress).filter(email => email !== '');
        const userPhoneNumbers = usersData.map(user => user.phoneNumber).filter(phoneNumber => phoneNumber !== '');

        response.status(200).json({
            userEmails: userEmails,
            userPhoneNumbers: userPhoneNumbers,
        })
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Internal server error!!!'
        })
    }
}
