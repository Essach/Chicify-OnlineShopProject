exports.payments = [
]

exports.postPayment = (request, response, next) => {
    try {
        makeTransferFromAccount()

        const { amount, purchaseId, purchaseQuantity } = request.body;

        payments.push({
            amount,
            purchaseId,
            purchaseQuantity
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
