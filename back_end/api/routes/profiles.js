const express = require('express');
const router = express.Router();

const profileControllers = require('../controllers/profiles');

const checkToken = require('../middlewares/checkToken');
const checkPayload = require('../middlewares/checkPayload');
const checkRole = require('../middlewares/checkRole');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/:pID', checkToken, checkPayload, profileControllers.getOneProfile);
router.post('/:pID', checkToken, checkPayload, checkRole, profileControllers.updatePersonalInfo);

module.exports = router;