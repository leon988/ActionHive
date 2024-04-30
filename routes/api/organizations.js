const express = require('express');
const router = express.Router();
const organizationsCtrl = require('../../controllers/api/organizations');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/organizations - Create a new organization 
router.post('/', ensureLoggedIn, organizationsCtrl.create);

// GET /api/organizations - Retrieve all organizations 
router.get('/', ensureLoggedIn, organizationsCtrl.index);

// GET /api/organizations/:id - Retrieve a single organization by ID 
router.get('/:id', ensureLoggedIn, organizationsCtrl.show);

// PUT /api/organizations/:id - Update an organization by ID 
router.put('/:id', ensureLoggedIn, organizationsCtrl.update);

module.exports = router;