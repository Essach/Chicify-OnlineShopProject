const Payment = require('../Classes/Payment.js')

const paymentsData = [
]

exports.postPayment = (request, response, next) => {
    try {
        const { products, price, address, cardInfo } = request.body;

        const newPayment = new Payment(paymentsData.length + 1, products, price, address, cardInfo);
        console.log(newPayment)
        paymentsData.push(newPayment);
        console.log(paymentsData)

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
        const { id } = request.body;

        const payment = paymentsData.find(payment => payment.id = id);
        // console.log(paymentsData)
        
        if (!payment) {
            response.status(404).json({
                message: `Couldn't find payment with given id`,
            });

            return
        }

        response.status(200).json({
            address: payment.address,
            cardInfo: payment.cardInfo,
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
