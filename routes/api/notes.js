const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/notes - Get all of the user's notes
router.get('/', ensureLoggedIn, notesCtrl.index);

// POST  /api/notes - Create a new note for the current user
router.post('/', ensureLoggedIn, notesCtrl.create);

module.exports = router;