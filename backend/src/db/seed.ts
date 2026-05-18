import mongoose from 'mongoose';
import { connectDB } from './index.ts';
import { Surah } from '../models/Surah.ts';
import { Ayah } from '../models/Ayah.ts';

const UNPKG_BASE = 'https://unpkg.com/quran-json@1.0.1/json';

async function seed() {
  console.log('Connecting to MongoDB...');
  await connectDB();

  const count = await Surah.countDocuments();
  if (count === 114) {
    console.log('Database already seeded with 114 surahs. Skipping seed.');
    process.exit(0);
    return;
  }

  console.log('Clearing existing data for fresh seed...');
  await Surah.deleteMany({});
  await Ayah.deleteMany({});

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

  console.log('Inserting Surahs and fetching Verses...');

  for (const surah of surahs) {
    console.log(`Processing Surah ${surah.number}: ${surah.transliteration_en}...`);
    await Surah.create({
      id: surah.number,
      name: surah.name.replace('سورة ', ''),
      transliteration: surah.transliteration_en,
      translation: surah.translation_en,
      type: surah.revelation_type.toLowerCase(),
      total_verses: surah.total_verses
    });

    const vRes = await fetch(`${UNPKG_BASE}/surahs/${surah.number}.json`);
    if (!vRes.ok) {
      throw new Error(`Failed to fetch verses for surah ${surah.number}: ${vRes.status} ${vRes.statusText}`);
    }
    const surahData = await vRes.json() as {
      verses: Array<{ number: number; text: string; translation_en: string; transliteration_en?: string }>;
    };

    const ayahsToInsert = surahData.verses.map(verse => ({
      surah_id: surah.number,
      ayah_number: verse.number,
      text: verse.text,
      translation: verse.translation_en,
      transliteration: verse.transliteration_en || ''
    }));

    await Ayah.insertMany(ayahsToInsert);
  }

  console.log('Successfully seeded Quran database in MongoDB!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
