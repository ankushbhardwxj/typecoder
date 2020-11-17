const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
});

module.exports = mongoose.model('User', userSchema);