const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lesson: { type: String },
  totalTypedCharacters: { type: String },
  correctlyTypedCharacters: { type: String },
  unproductiveKeystrokes: { type: String },
  elapsedTime: { type: String },
  WPM: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
