const express = require('express');
const { getProducts, getProduct, getProductReviews, postProduct, putProductBySeller, putProductBySystem, deleteProduct } = require('../controllers/products.js');

const router = express.Router();

router.get('/:id', getProduct);
router.get('/', getProducts);
router.get('/:id', getProductReviews);
router.post('/', postProduct);
router.put('/seller', putProductBySeller);
router.put('/system', putProductBySystem);
router.delete('/:id', deleteProduct)
router.use((request, response) => response.status(404).end());

module.exports = router