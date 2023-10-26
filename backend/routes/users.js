const express = require('express');
const { postUserCreate, postUserLogin, patchUserOrder, patchUserFavorite, patchUserSeller, patchUserPassword, getUserName, getUsers, patchSendMessage } = require('../controllers/users.js');

const router = express.Router();

router.post('/create', postUserCreate);
router.post('/login', postUserLogin);
router.patch('/orders', patchUserOrder);
router.patch('/favorites', patchUserFavorite);
router.patch('/seller', patchUserSeller);
router.patch('/password', patchUserPassword);
router.patch('/message', patchSendMessage);
router.get('/all', getUsers);
router.get('/:id', getUserName);
router.use((request, response) => response.status(404).end());

module.exports = router;