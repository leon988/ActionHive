const express = require('express');
const router = express.Router();
const organizationsCtrl = require('../../controllers/api/organizations');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// All paths start with '/api/organizations'

// GET /api/organizations - Retrieve the logged-in user's organization
router.get('/', ensureLoggedIn, organizationsCtrl.show);

// POST /api/organizations - Create a new organization
router.post('/', ensureLoggedIn, organizationsCtrl.create);

// PUT /api/organizations - Update the logged-in user's organization
router.put('/', ensureLoggedIn, organizationsCtrl.update);

module.exports = router;
