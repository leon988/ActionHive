const jwt = require('jsonwebtoken');
const Note = require('../../models/note');
const bcrypt = require('bcrypt');
require ('dotenv').config

module.exports = {
  index,
  create
}

async function index(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  const { text } = req.body; 
  if (!text) {
    return res.status(400).json({ message: "Note text is required" });
  }
  
  try {
    const note = new Note({
      text,
      user: req.user._id  
    });

    const savedNote = await note.save();
    res.json(savedNote);  
  } catch (err) {
    console.error(err);  
    res.status(400).json({ message: 'Error saving note' });
  }
}
