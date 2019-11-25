const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/users');

const checkToken = require('../middlewares/checkToken');
const checkPayload = require('../middlewares/checkPayload');
const checkAdmin = require('../middlewares/checkAdmin');

// email, pass: => status
router.post('/signup', userControllers.signUp);


router.delete('/:pID', checkToken, checkPayload, checkAdmin, userControllers.deleteUser);

// email, pass: => token 200; status
router.post('/login', userControllers.logIn);

router.post('/logout', checkToken, checkPayload, userControllers.logOut);

router.post('/changePassword', checkToken, checkPayload, userControllers.changePassWord);

module.exports = router;