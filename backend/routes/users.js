const express = require('express');
const { postUserCreate, postUserLogin, patchUserOrder, patchUserFavorite, getUsers } = require('../controllers/users.js');

const router = express.Router();

router.post('/create', postUserCreate);
router.post('/login', postUserLogin);
router.patch('/orders', patchUserOrder);
router.patch('/favorites', patchUserFavorite);
router.get('/all', getUsers);
router.use((request, response) => response.status(404).end());

module.exports = router;