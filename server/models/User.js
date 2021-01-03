const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  public_lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  recent_activity: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
