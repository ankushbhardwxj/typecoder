import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
dotenv.config();
app.use((req, res, next): any => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
})

// connect to db
mongoose.connect(process.env.MONGODB_URI || "");
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', () => console.log("Failed to connect to DB"));
db.once("open", () => console.log("Successfully connected to DB"));

/* Routes 
 * - add a lesson: /api/v1/lesson
 * - get all lessons: /api/v1/lessons
 * - delete a lesson: /api/v1/lesson/id
 * - get a lesson: /api/v1/lesson/id
 * - add user to leaderboard: /api/v1/lesson/leaderboard/
 * - update user in leaderboard: /api/v1/lesson/leaderboard/:lessonId
 * - return leaderboard of a lesson: /api/v1/lesson/leaderboard
 * - get userInfo from leaderboard: /api/v1/lesson/leaderboard/id
 */
app.use("/api/v1", router);
app.listen(process.env.PORT, () => {
  console.log("Listening on", process.env.PORT);
})
