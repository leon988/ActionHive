const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Education', 'Healthcare', 'Social Services', 'Other'],
    required: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  }
}, { timestamps: true });


const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;

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
