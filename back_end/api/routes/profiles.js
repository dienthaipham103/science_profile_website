const express = require('express');
const router = express.Router();

const profileControllers = require('../controllers/profiles');

const checkToken = require('../middlewares/checkToken');
const checkPayload = require('../middlewares/checkPayload');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/:pID', checkToken, checkPayload, profileControllers.getOneProfile);

module.exports = router;