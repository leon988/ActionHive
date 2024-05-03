const express = require('express');
const router = express.Router();
const volunteersCtrl = require('../../controllers/api/volunteers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

module.exports = router;