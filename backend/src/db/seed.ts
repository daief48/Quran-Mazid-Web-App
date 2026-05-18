import { db, initDb } from './index.ts';

const UNPKG_BASE = 'https://unpkg.com/quran-json@1.0.1/json';

async function seed() {
  console.log('Initializing database schema...');
  initDb();

  const countRow = db.prepare('SELECT count(*) as count FROM surahs').get() as { count: number };
  if (countRow.count === 114) {
    console.log('Database already seeded with 114 surahs. Skipping seed.');
    return;
  }

  console.log('Clearing existing data for fresh seed...');
  db.exec('DELETE FROM ayahs; DELETE FROM surahs; DELETE FROM search_index;');

  console.log('Fetching surahs list from unpkg...');
  const res = await fetch(`${UNPKG_BASE}/surahs.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch surahs list from unpkg: ${res.status} ${res.statusText}`);
  }
  const surahs = await res.json() as Array<{
    number: number;
    name: string;
    transliteration_en: string;
    translation_en: string;
    revelation_type: string;
    total_verses: number;
  }>;

  console.log('Fetching all 114 surahs verse data from unpkg...');
  const allSurahsVerses: Array<{
    surahNumber: number;
    verses: Array<{ number: number; text: string; translation_en: string }>;
  }> = [];

  for (const surah of surahs) {
    console.log(`Downloading Surah ${surah.number}: ${surah.transliteration_en}...`);
    const vRes = await fetch(`${UNPKG_BASE}/surahs/${surah.number}.json`);
    if (!vRes.ok) {
      throw new Error(`Failed to fetch verses for surah ${surah.number}: ${vRes.status} ${vRes.statusText}`);
    }
    const surahData = await vRes.json() as {
      verses: Array<{ number: number; text: string; translation_en: string }>;
    };
    allSurahsVerses.push({ surahNumber: surah.number, verses: surahData.verses });
  }

  console.log('All downloads complete. Running synchronous SQLite transaction...');

  const insertSurah = db.prepare(`
    INSERT INTO surahs (id, name_arabic, name_english, translation, revelation_type, total_ayahs)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertAyah = db.prepare(`
    INSERT INTO ayahs (surah_id, ayah_number, text_arabic, text_english, transliteration)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertSearch = db.prepare(`
    INSERT INTO search_index (surah_id, ayah_number, text_arabic, text_english)
    VALUES (?, ?, ?, ?)
  `);

  const insertTransaction = db.transaction(() => {
    for (const surah of surahs) {
      insertSurah.run(
        surah.number,
        surah.name.replace('سورة ', ''),
        surah.transliteration_en,
        surah.translation_en,
        surah.revelation_type.toLowerCase(),
        surah.total_verses
      );

      const surahVerses = allSurahsVerses.find(s => s.surahNumber === surah.number)?.verses || [];
      for (const verse of surahVerses) {
        insertAyah.run(
          surah.number,
          verse.number,
          verse.text,
          verse.translation_en,
          ''
        );

        insertSearch.run(
          surah.number,
          verse.number,
          verse.text,
          verse.translation_en
        );
      }
    }
  });

  insertTransaction();
  console.log('Successfully seeded Quran database with FTS5 search index!');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
