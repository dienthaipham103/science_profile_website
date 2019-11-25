const express = require('express');
const router = express.Router();

const authenticationControllers = require('../controllers/authentications');

const checkToken = require('../middlewares/checkToken');
const checkPayload = require('../middlewares/checkPayload');
const checkRole = require('../middlewares/checkRole');
const checkAdmin = require('../middlewares/checkAdmin');

// router.get('/:pID', checkToken, checkPayload, profileControllers.getOneProfile);
// router.post('/update/:pID', checkToken, checkPayload, checkRole, profileControllers.updatePersonalInfo);
router.get('/', checkToken, checkPayload, authenticationControllers.loginCheck);
router.get('/checkAdmin', checkToken, checkPayload, checkAdmin, authenticationControllers.adminCheck);
// router.delete('/delete/:pID', educationControllers.deleteOneEducation);
// router.post('/update/:pID', educationControllers.updateOneEducation);

module.exports = router;