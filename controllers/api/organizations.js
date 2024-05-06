const Organization = require('../../models/organization');
const User = require('../../models/user');
require ('dotenv').config

module.exports = {
  create,
  index,
  show, 
  update
}

async function create(req, res) {
  console.log(req.body, req.user)
  try {
    const existingOrganization = await Organization.findOne({ user: req.user._id });
    if (existingOrganization) {
      throw new Error('User already has an organization');
    }
    console.log('user has no organization')
    req.body.user = req.user
    console.log(req.body)
    const organization = await Organization.create(req.body);
    console.log(organization)
    res.json(organization);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const organization = await Organization.findById(req.params.id);
    // console.log(organization)
    if (!organization) {
      throw new Error('Organization not found');
    }
    res.json(organization);
  } catch (err) {
    res.status(400).json(err);
  }
}

// function to see all organizations
async function index(req, res) {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const organization = await Organization.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    if (!organization) {
      throw new Error('Organization not found');
    }
    res.json(organization);
  } catch (err) {
    res.status(400).json(err);
  }
}
