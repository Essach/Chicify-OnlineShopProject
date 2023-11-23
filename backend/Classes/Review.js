
class Review {
    constructor(rating, comment = '', userId) {
        this.rating = rating;
        this.comment = comment;
        this.userId = userId;
    }
}

module.exports = Review