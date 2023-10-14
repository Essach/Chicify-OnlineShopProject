const Payment = require('../Classes/Payment.js')

const paymentsData = [
]

exports.postPayment = (request, response, next) => {
    try {
        const { products, price, address, cardInfo } = request.body;

        const newPayment = new Payment(paymentsData.length + 1, products, price, address, cardInfo);
        paymentsData.push(newPayment);

        response.status(200).json({
            paymentId: newPayment.id,
            message: 'Payment sent',
        })

        return;
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Code error'
        })
    }
}

exports.getPaymentInfo = (request, response, next) => {
    try {
        const { id } = request.params;

        const payment = paymentsData.find(item => item.id === parseInt(id));
        


        if (!payment) {
            response.status(404).json({
                message: `Couldn't find payment with given id`,
            });

            return
        }

        response.status(200).json({
            products: payment.products,
            address: payment.address,
            cardInfo: payment.cardInfo,
            price: payment.price,
        })

        return;
    } catch (error) {
        response.status(500).json({
            error,
            message: 'Code error',
        })
    }
}

const makeTransferFromAccount = function () {
    return;
}
