const express = require('express');
const { postUser, patchUserOrder, patchUserFavorite } = require('../controllers/users.js');

const router = express.Router();

router.post('/', postUser);
router.patch('/orders', patchUserOrder);
router.patch('/favorites', patchUserFavorite);
router.use((request, response) => response.status(404).end());

module.exports = router;