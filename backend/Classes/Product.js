import Ids from "../AdditionalFiles/Ids"

const createNewId = () => {
    let newId = Math.random().toFixed(5) * 100000;
    while (Ids.findIndex(newId) !== -1) {
        newId += 1;
    }
    if (newId.toString().length() > 5) {
        throw new Error('Database ran out of or will soon run out of new ids')
    }
    return newId
}

class Product {
    constructor() {
        id: createNewId()
    }
}

export default Product
