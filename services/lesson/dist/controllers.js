"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboardByLesson = exports.getUserPositionFromLeaderboard = exports.addUserToLeaderboard = exports.getLessonById = exports.deleteLessonById = exports.addLesson = exports.getAllLessons = void 0;
const model_1 = __importDefault(require("./model"));
const mongoose_1 = __importDefault(require("mongoose"));
async function getAllLessons(req, res) {
    try {
        const results = await model_1.default.find();
        res.status(200).json({ results: results });
    }
    catch (err) {
        console.error("Failed to get all lessons");
        res.status(500).json({ error: "Failed to get all lessons" });
    }
}
exports.getAllLessons = getAllLessons;
async function addLesson(req, res) {
    try {
        const lesson = new model_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            title: req.body.title,
            language: req.body.language,
            content: req.body.content,
            leaderboard: [],
            userPerformance: []
        });
        await lesson.save();
        res.status(200).json({ message: "Added lesson " + req.body.title });
    }
    catch (err) {
        console.error("Failed to add lesson");
        res.status(500).json({ error: "Failed to add lesson" });
    }
}
exports.addLesson = addLesson;
async function deleteLessonById(req, res) {
    try {
        const deletedLesson = await model_1.default.findOneAndDelete({
            _id: req.params.id
        });
        console.log(deletedLesson);
        res.status(200).json({ message: "Removed lesson" });
    }
    catch (err) {
        console.error("Failed to delete lesson");
        res.status(500).json({ error: "Failed to delete lesson" });
    }
}
exports.deleteLessonById = deleteLessonById;
async function getLessonById(req, res) {
    try {
        const results = await model_1.default.findOne({ _id: req.params.id });
        console.log(results);
        res.status(200).json({ result: results });
    }
    catch (err) {
        console.error("Couldn't get lesson");
        res.status(500).json({ error: "Failed to get lesson" });
    }
}
exports.getLessonById = getLessonById;
async function addUserToLeaderboard(req, res) {
    try {
        const user = { name: req.body.username, wpm: req.body.wpm };
        const lessonId = req.params.id;
        const updateLeaderboard = await model_1.default.updateOne({ _id: lessonId }, { $push: { leaderboard: {
                    $each: [user],
                    $sort: { wpm: -1 }
                } } });
        res.status(200).json({ result: updateLeaderboard });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get lesson" });
    }
}
exports.addUserToLeaderboard = addUserToLeaderboard;
async function getUserPositionFromLeaderboard(req, res) {
    try {
        throw Error("NOT FOUND");
    }
    catch (err) {
        res.status(500).json({ error: "Failed to get lesson" });
    }
}
exports.getUserPositionFromLeaderboard = getUserPositionFromLeaderboard;
async function getLeaderboardByLesson(req, res) {
    try {
        const lessonId = req.params.id;
        const results = await model_1.default
            .findOne({ _id: lessonId })
            .sort({ 'wpm': 1 });
        res.status(200).json({ result: results.leaderboard });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get lesson" });
    }
}
exports.getLeaderboardByLesson = getLeaderboardByLesson;
//# sourceMappingURL=controllers.js.map