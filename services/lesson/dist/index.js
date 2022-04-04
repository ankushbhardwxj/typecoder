"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
dotenv_1.default.config();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
mongoose_1.default.connect(process.env.MONGODB_URI || "");
mongoose_1.default.set('debug', true);
const db = mongoose_1.default.connection;
db.on('error', () => console.log("Failed to connect to DB"));
db.once("open", () => console.log("Successfully connected to DB"));
app.use("/api/v1", routes_1.default);
app.listen(process.env.PORT, () => {
    console.log("Listening on", process.env.PORT);
});
//# sourceMappingURL=index.js.map