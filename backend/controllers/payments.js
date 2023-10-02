const Payment = require('../Classes/Payment.js')

paymentsData = [
]

exports.postPayment = (request, response, next) => {
    try {
        const { products, price, address, cardInfo } = request.body;

        const newPayment = new Payment(products, price, address, cardInfo);
        paymentsData.push(newPayment);

        response.status(200).json({
            message: 'Payment sent'
        })

        return;
    } catch (error) {
        response.status(404).json({
            error,
            message: 'Code error'
        })
    }
}

const makeTransferFromAccount = function () {
    return;
}
