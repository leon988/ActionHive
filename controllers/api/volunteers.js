const Volunteer = require('../../models/volunteer');
const User = require('../../models/user');
require ('dotenv').config

module.exports = {
  create,
  show,
  index,
  update
}

async function create(req, res) {
  try {
    const existingVolunteer = await Volunteer.findOne({ user: req.user._id });
    if (existingVolunteer) {
      throw new Error('User already has a volunteer record');
    }
    const volunteer = await Volunteer.create(req.body);
    res.json(volunteer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function show(req, res) {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    console.log(volunteer)
    if (!volunteer) {
      throw new Error('Volunteer not found');
    }
    res.json(volunteer);
  } catch (err) {
    res.status(400).json(err);
  }
}

// function to see all volunteers
async function index(req, res) {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const volunteer = await Volunteer.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    if (!volunteer) {
      throw new Error('Volunteer not found');
    }
    res.json(volunteer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}