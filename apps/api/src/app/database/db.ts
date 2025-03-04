import path from "node:path";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlLiteDbPath = path.join(__dirname, "..", "..", "..", "data.db");
const sqliteDb = new Database(sqlLiteDbPath);

export const db = drizzle(sqliteDb);
