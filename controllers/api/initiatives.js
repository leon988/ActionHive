const Organization = require("../../models/organization");
require("dotenv").config;

module.exports = {
  create,
  index,
  show,
  update,
  delete: deleteInitiative,
};

async function create(req, res) {
  try {
    console.log(req.body)
    const organization = await Organization.findOne({ user: req.user._id });
    console.log(req.user._id)
    if (!organization) {
      throw new Error("Organization not found");
    }
    organization.initiatives.push(req.body);
    await organization.save();
    res.json(organization.initiatives);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function index(req, res) {
  try {
    const organization = await Organization.findOne({ user: req.user._id });
    if (!organization) {
      throw new Error("Organization not found");
    }
    res.json(organization.initiatives);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const organization = await Organization.find({"initiatives._id": req.params.id}).populate("initiatives");
    console.log(organization)
    if (!organization) {
      throw new Error("Organization not found");
    }
    organization[0].initiatives.forEach(init => console.log(init))
    const initiative = organization[0].initiatives.filter(
      (init) => init._id.toString() === req.params.id
    );
    if (!initiative) {
      throw new Error("Initiative not found");
    }
    res.json(initiative);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const organization = await Organization.findOne({ user: req.user._id });
    if (!organization) {
      throw new Error("Organization not found");
    }
    const initiativeIndex = organization.initiatives.findIndex(
      (initiative) => initiative._id.toString() === req.params.id
    );
    if (initiativeIndex === -1) {
      throw new Error("Initiative not found");
    }
    // Update specific fields of the initiative
    Object.assign(organization.initiatives[initiativeIndex], req.body);
    await organization.save();
    res.json(organization.initiatives);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteInitiative(req, res) {
  try {
    const organization = await Organization.findOne({ user: req.user._id });
    if (!organization) {
      throw new Error("Organization not found");
    }
    organization.initiatives = organization.initiatives.filter(
      (initiative) => initiative._id.toString() !== req.params.id
    );
    await organization.save();
    res.json({ message: "Initiative deleted successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
}
