const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const initiativeSchema = new Schema({
  description: { type: String, required: true },
  location: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  date: { type: Date, required: true },
  category: [{ 
    type: String,
    enum: [
      'Education',
      'Healthcare',
      'Environmental',
      'Community Development',
      'Arts and Culture',
      'Human Rights',
      'Disaster Relief',
      'Animal Welfare',
      'Youth Programs',
      'Senior Services'], 
    required: true
  }],
  duration: { type: String, required: true },
  requirements: { type: String, required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
}, { timestamps: true });

const organizationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Education', 'Healthcare', 'Social Services', 'Other'],
    required: true 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  initiatives: [initiativeSchema] 
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);

// NEW ORGANIZATION SCHEMA:
// TODO: CHECK IT OUT
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const organizationSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { 
//     type: String, 
//     enum: ['Education', 'Healthcare', 'Social Services', 'Other'],
//     required: true 
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true
//   }
// }, { timestamps: true });

// const Organization = mongoose.model('Organization', organizationSchema);

// module.exports = Organization;
