import sqlite3 from "sqlite3";
import { error, info } from "./logger";
import path from 'path';
const sql3 = sqlite3.verbose();

const dbPath = path.resolve(__dirname, '../data/CommunityTheatre.db');
const DB = new sql3.Database(dbPath, sqlite3.OPEN_READWRITE, connected);

function connected(err: Error | null) {
  if (err) {
    error(err.message);
    return;
  }
  info("Connected to the DB");
}


export { DB }
