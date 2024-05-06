const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const initiativeSchema = new Schema({
  name: String,
  description: { type: String },
  location: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: Number
  },
  date: { type: Date },
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
  }],
  duration: { type: String },
  requirements: { type: String },
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
