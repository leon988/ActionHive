const express = require('express');
const router = express.Router();
const organizationsCtrl = require('../../controllers/api/organizations');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// All paths start with '/api/organizations'

// GET /api/organizations - Retrieve all organizations
router.get('/', ensureLoggedIn, organizationsCtrl.index);

// GET /api/organizations/:id - Retrieve the logged-in user's organization
// id
router.get('/:id', ensureLoggedIn, organizationsCtrl.show);

// POST /api/organizations - Create a new organization
router.post('/', ensureLoggedIn, organizationsCtrl.create);

// PUT /api/organizations/:id - Update the logged-in user's organization
router.put('/', ensureLoggedIn, organizationsCtrl.update);

module.exports = router;
