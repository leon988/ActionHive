const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: { type: String },
  skills: [{ type: String }],
  Status: { type: String },
  initiatives: [{
    type: Schema.Types.ObjectId,
    ref: 'Initiative'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
