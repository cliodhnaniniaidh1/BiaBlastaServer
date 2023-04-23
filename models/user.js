// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
