const express = require('express');
const { postPayment } = require('../controllers/payments.js');

const router = express.Router();

router.post('/', postPayment);
router.use((request, response) => response.status(404).end());

module.exports = router