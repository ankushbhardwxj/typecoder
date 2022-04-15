import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  language: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  leaderboard: [
    {
      name: { type: String }, 
      wpm: { type: Number },
      date: { type: Date, default: Date.now }
    }
  ],
  // userPerformance: [
  //   {
  //     wpm: { type: Number },
  //     date: { type: Date, default: Date.now },
  //     totalTypedCharacters: { type: String },
  //     correctlyTypedCharacters: { type: String }, 
  //     unproductiveKeystrokes: { type: String },
  //     elapsedTime: { type: String }
  //   }
  // ]
});

export default mongoose.model('Lesson', lessonSchema);
