const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  is_verified: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
