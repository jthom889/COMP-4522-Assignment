import sqlite3 from "sqlite3";
import { error, info } from "./logger";
const sql3 = sqlite3.verbose();

const DB = new sql3.Database('../data/CommunityTheatre.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    error(err.message);
    return;
  }
  info("Connected to the DB");
}


export { DB }
