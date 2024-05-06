const express = require('express');
const router = express.Router();
const volunteersCtrl = require('../../controllers/api/volunteers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/organizations - Retrieve all organizations
router.get('/', ensureLoggedIn, volunteersCtrl.index);

// GET /api/volunteers/:id - Retrieve the logged-in user's volunteer
// id
router.get('/:id', ensureLoggedIn, volunteersCtrl.show);

// POST /api/volunteers - Create a new volunteer
router.post('/', ensureLoggedIn, volunteersCtrl.create);

// PUT /api/volunteers/:id - Update the logged-in user's volunteer
router.put('/', ensureLoggedIn, volunteersCtrl.update);

module.exports = router;