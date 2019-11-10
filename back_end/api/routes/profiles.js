const express = require('express');
const router = express.Router();

const profileControllers = require('../controllers/profiles');

router.get('/:pID', profileControllers.getOneProfile);

module.exports = router;

