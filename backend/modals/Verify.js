const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  email: {
    type: String,
  },
  code: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Verify = mongoose.model('verify', verifySchema);

module.exports = Verify;
