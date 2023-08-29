const User = require('../Classes/User.js');
const { payments } = require('./payments.js');

const { productsData } = require('./products.js');

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

]

exports.postUserCreate = (request, response, next) => {
    try {
        const { username, phoneNumber, emailAddress, password } = request.body;

        const newUser = new User(1, username, phoneNumber, emailAddress, password, [], []);
        usersData.push(newUser);

        console.log(newUser)

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


        console.log('login')
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

exports.patchUserOrder = (request, response, next) => {
    try {
        const { userId, productId, purchaseId, purchaseQuantity} = request.body;

        const product = productsData.find(product => product.id === productId);
        const user = usersData.find(user => user.userId === userId);

        if (!product) {
            response.status(404).json({
                message: "Couldn't find product with given id",
            });

            return;
        } else if (!user) {
            response.status(404).json({
                message: "Couldn't find the user with given id"
            });

            return;
        }

        const payment = payments.find(payment => payment.id === purchaseId);
        const hasUserPayed = payment && payment.value === productPrice;
        if (!hasUserPayed) {
            response.status(403).json({
                message: 'Payment not completed'
            })
        }

        const order = product;
        order.purchaseId = purchaseId
        
        const userUpdated = user.orders.concat(order)
        
        product.quantity -= purchaseQuantity

        response.status(200).json({
            userUpdated
        })
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Problem with ordering'
        })
    }
}

const ADDFAVORITE = 'add';
const REMOVEFAVORITE = 'remove';

exports.patchUserFavorite = (request, response, next) => {
    try {
        const { userId, productId, action } = request.body;

        const user = usersData.find(user => user.userId = userId);

        if (!user) {
            response.status(404).json({
                message: "Couldn't find user with given id",
            });

            return;
        }

        if (action === ADDFAVORITE) {
            const favoriteProduct = product
            const product = productsData.find(product => product.id = productId);
            const userUpdated = user.favorites.concat(favoriteProduct);
        } else if (action === REMOVEFAVORITE) {
            const userUpdated = user.favorites.filter(favorite => favorite.id !== productId)
        }

        response.status(200).json({
            userUpdated
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
        const { id } = request.params;
        const userToUpdate = usersData.find(user => user.userId === id);
        
        if (!userToUpdate) {
            response.status(404).json({
                message: "Couldn't find the user with given id",
            });

            return;
        } else if (user.accessLevel !== 1) {
            response.status(405).json({
                message: 'Tried to make non user access level user a seller',
            });

            return;
        }

        userToUpdate.becomeSeller()

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
