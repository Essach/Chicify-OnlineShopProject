import User from "../Classes/User";
import payments from "./payments";

const {productsData} = require('./products')

const usersData = [
    new User(
        1,
        'User',
        '123',
        [],
        [],
    ),
    new User(
        3,
        'Essach',
        '***',
        [],
        [],
    ),

]

exports.postUser = (request, response, next) => {
    try {
        const { userId, password } = request.body;

        const user = usersData.find(u => u.userId === userId);
        if (!user) {
            response.status(404).json({
                message: 'Invalid login or password',
            });

            return;
        }

        const isPasswordCorrect = user.password === password;
        if (!isPasswordCorrect) {
            response.status(404).json({
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

exports.putUser = (request, response, next) => {
    try {
        const { id } = request.params;
        const userToUpdate = usersData.find(user => user.userId === id);
        
        if (!user) {
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
