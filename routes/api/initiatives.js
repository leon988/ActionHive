const express = require('express');
const router = express.Router();
const initiativesCtrl = require('../../controllers/api/initiatives');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/initiatives - Create a new initiative
router.post('/', ensureLoggedIn, initiativesCtrl.create);

// GET /api/initiatives - Retrieve all initiatives 
router.get('/', ensureLoggedIn, initiativesCtrl.index);

// GET /api/initiatives/:id - Retrieve a single initiative by ID
router.get('/:id', ensureLoggedIn, initiativesCtrl.show);

// PUT /api/initiatives/:id - Update an initiative by ID
router.put('/:id', ensureLoggedIn, initiativesCtrl.update);

// DELETE /api/initiatives/:id - Delete an initiative by ID
router.delete('/:id', ensureLoggedIn, initiativesCtrl.delete);


module.exports = router;