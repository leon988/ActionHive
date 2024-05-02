const jwt = require('jsonwebtoken');
const Organization = require('../../models/organization');
const bcrypt = require('bcrypt');
require ('dotenv').config

module.exports = {
  create,
  index,
  show,
  update,
  delete: deleteInitiative 
};

async function create(req, res) {
  try {
      const organization = await Organization.findById(req.user.organization);
      if (!organization) {
          throw new Error('Organization not found');
      }
      organization.initiatives.push(req.body);
      await organization.save();
      res.json(organization.initiatives[organization.initiatives.length - 1]);
  } catch (err) {
      res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
      const organization = await Organization.findById(req.user.organization);
      if (!organization) {
          throw new Error('Organization not found');
      }
      res.json(organization.initiatives);
  } catch (err) {
      res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
      const organization = await Organization.findOne({'initiatives._id': req.params.id}, {'initiatives.$': 1});
      if (!organization || organization.initiatives.length === 0) {
          throw new Error('Initiative not found');
      }
      res.json(organization.initiatives[0]);
  } catch (err) {
      res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
      const organization = await Organization.findOneAndUpdate(
          {"initiatives._id": req.params.id},
          {$set: {"initiatives.$": {...req.body, _id: req.params.id}}},
          {new: true, runValidators: true}
      );
      if (!organization) {
          throw new Error('Initiative not found');
      }
      res.json(organization.initiatives.id(req.params.id));  
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteInitiative(req, res) {
  try {
      const organization = await Organization.findByIdAndUpdate(
          req.user.organization,
          {$pull: {initiatives: {_id: req.params.id}}},
          {new: true}
      );
      if (!organization) {
          throw new Error('Initiative not found');
      }
      res.json({message: 'Initiative deleted successfully'});
  } catch (err) {
      res.status(400).json(err);
  }
}
