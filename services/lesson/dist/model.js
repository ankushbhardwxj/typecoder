"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
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
    userPerformance: [
        {
            wpm: { type: Number },
            date: { type: Date, default: Date.now },
            totalTypedCharacters: { type: String },
            correctlyTypedCharacters: { type: String },
            unproductiveKeystrokes: { type: String },
            elapsedTime: { type: String }
        }
    ]
});
exports.default = mongoose_1.default.model('Lesson', lessonSchema);
//# sourceMappingURL=model.js.map