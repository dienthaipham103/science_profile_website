const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/users');

const checkToken = require('../middlewares/checkToken');
const checkPayload = require('../middlewares/checkPayload');
const checkAdmin = require('../middlewares/checkAdmin');

router.post('/signup', userControllers.signUp);

router.delete('/:userID', checkToken, checkPayload, checkAdmin, userControllers.deleteUser);

router.post('/login', userControllers.logIn);

router.post('/logout', checkToken, checkPayload, userControllers.logOut);

router.post('/changePassword', checkToken, checkPayload, userControllers.changePassWord);

module.exports = router;