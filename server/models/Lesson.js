const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  code: { type: String }
})

module.exports = mongoose.model('Lesson', lessonSchema);
