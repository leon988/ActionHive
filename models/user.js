const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false 
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model('User', userSchema);

// NEW USER SCHEMA: 
// TODO: CHECK IT OUT
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const Schema = mongoose.Schema;

// const SALT_ROUNDS = 6;

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: {
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     required: true
//   },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['Volunteer', 'Organization'],
//     required: true
//   },
//   organization: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Organization',
//     required: function() { return this.role === 'Organization'; }
//   }
// }, {
//   timestamps: true,
//   toJSON: {
//     transform: function(doc, ret) {
//       delete ret.password;
//       return ret;
//     }
//   }
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);
