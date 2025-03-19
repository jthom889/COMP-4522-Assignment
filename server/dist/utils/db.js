"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const logger_1 = require("./logger");
const path_1 = __importDefault(require("path"));
const sql3 = sqlite3_1.default.verbose();
const dbPath = path_1.default.resolve(__dirname, '../data/CommunityTheatre.db');
const DB = new sql3.Database(dbPath, sqlite3_1.default.OPEN_READWRITE, connected);
exports.DB = DB;
function connected(err) {
    if (err) {
        (0, logger_1.error)(err.message);
        return;
    }
    (0, logger_1.info)("Connected to the DB");
}
