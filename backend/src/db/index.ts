import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { CONFIG } from '../config/index.ts';

// Ensure db directory exists
const dbDir = path.dirname(CONFIG.DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(CONFIG.DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS surahs (
      id INTEGER PRIMARY KEY,
      name_arabic TEXT NOT NULL,
      name_english TEXT NOT NULL,
      translation TEXT NOT NULL,
      revelation_type TEXT NOT NULL,
      total_ayahs INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ayahs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      surah_id INTEGER NOT NULL,
      ayah_number INTEGER NOT NULL,
      text_arabic TEXT NOT NULL,
      text_english TEXT NOT NULL,
      transliteration TEXT,
      page_number INTEGER,
      juz_number INTEGER,
      FOREIGN KEY(surah_id) REFERENCES surahs(id)
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(
      surah_id UNINDEXED,
      ayah_number UNINDEXED,
      text_arabic,
      text_english,
      tokenize='porter'
    );
  `);
}
