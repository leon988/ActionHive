const Organization = require('../../models/organization');
require ('dotenv').config

module.exports = {
  create,
  show, 
  update
}

async function create(req, res) {
  try {
    const existingOrganization = await Organization.findOne({ user: req.user._id });
    if (existingOrganization) {
      throw new Error('User already has an organization');
    }
    const organization = await Organization.create({ ...req.body, user: req.user._id });
    res.json(organization);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const organization = await Organization.findOne({ user: req.user._id });
    if (!organization) {
      throw new Error('Organization not found');
    }
    res.json(organization);
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
