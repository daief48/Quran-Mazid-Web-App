import { SearchResultItem } from '../types/index.ts';
import { Ayah as AyahModel } from '../models/Ayah.ts';
import { Surah as SurahModel } from '../models/Surah.ts';

export class SearchRepository {
  public async searchQuran(query: string, limit = 30): Promise<SearchResultItem[]> {
    const sanitized = query.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
    if (!sanitized) return [];

    try {
      // 1. Find matching Ayahs using text search
      // To support partial matches, we could use regex, but for full-text search $text is faster.
      // However, MongoDB $text doesn't support partial prefix matches easily like FTS5 "*".
      // We will use a regex search across text and translation for better user experience.
      const regex = new RegExp(sanitized, 'i');
      
      const ayahs = await AyahModel.find({
        $or: [
          { translation: { $regex: regex } },
          { text: { $regex: regex } },
          { transliteration: { $regex: regex } }
        ]
      })
      .limit(limit)
      .lean();

      if (ayahs.length === 0) return [];

      // 2. Fetch related Surah info to attach names
      const surahIds = [...new Set(ayahs.map((a: any) => a.surah_id))];
      const surahs = await SurahModel.find({ id: { $in: surahIds } }).lean();
      const surahMap = new Map(surahs.map((s: any) => [s.id, s]));

      // 3. Highlight matches (similar to SQLite snippet)
      return ayahs.map((row: any) => {
        const surah: any = surahMap.get(row.surah_id);
        
        let matched_text = "";
        
        // Simple highlighting logic
        if (regex.test(row.translation)) {
           // highlight English
           matched_text = row.translation.replace(new RegExp(`(${sanitized})`, 'gi'), '<mark>$1</mark>');
        } else if (regex.test(row.text)) {
           // highlight Arabic
           matched_text = row.text.replace(new RegExp(`(${sanitized})`, 'gi'), '<mark>$1</mark>');
        } else {
           matched_text = row.transliteration.replace(new RegExp(`(${sanitized})`, 'gi'), '<mark>$1</mark>');
        }

        // truncate long texts around the mark
        const markIndex = matched_text.indexOf('<mark>');
        if (markIndex > 50) {
           matched_text = '...' + matched_text.substring(markIndex - 40);
        }
        if (matched_text.length > markIndex + sanitized.length + 100) {
           matched_text = matched_text.substring(0, markIndex + sanitized.length + 100) + '...';
        }

        return {
          surah_id: row.surah_id,
          surah_name: surah ? `${surah.name} (${surah.transliteration})` : `Surah ${row.surah_id}`,
          ayah_number: row.ayah_number,
          text_arabic: row.text,
          text_english: row.translation,
          matched_text,
        };
      });

    } catch (err) {
      console.warn('MongoDB Search error:', err);
      return [];
    }
  }
}
