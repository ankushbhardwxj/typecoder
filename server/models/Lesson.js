const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  date: { type: Date, default: Date.now },
  records: [
    { author: { type: String }, WPM: { type: Number } }
  ]
});

module.exports = mongoose.model('Lesson', lessonSchema);
