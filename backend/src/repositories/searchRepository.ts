import { db } from '../db/index.ts';
import { SearchResultItem } from '../types/index.ts';

export class SearchRepository {
  private getSurahNameStmt = db.prepare(`
    SELECT name_arabic, name_english FROM surahs WHERE id = ?
  `);

  public searchQuran(query: string, limit = 30): SearchResultItem[] {
    // Sanitize query for FTS5 syntax
    const sanitized = query.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
    if (!sanitized) return [];

    // FTS5 prefix matching query
    const ftsQuery = `"${sanitized}"*`;

    try {
      const stmt = db.prepare(`
        SELECT 
          surah_id, 
          ayah_number, 
          text_arabic, 
          text_english,
          snippet(search_index, 2, '<mark>', '</mark>', '...', 15) as matched_arabic,
          snippet(search_index, 3, '<mark>', '</mark>', '...', 15) as matched_english
        FROM search_index 
        WHERE search_index MATCH ? 
        ORDER BY rank 
        LIMIT ?
      `);

      const rows = stmt.all(ftsQuery, limit) as Array<{
        surah_id: number;
        ayah_number: number;
        text_arabic: string;
        text_english: string;
        matched_arabic: string;
        matched_english: string;
      }>;

      return rows.map(row => {
        const surah = this.getSurahNameStmt.get(row.surah_id) as { name_arabic: string; name_english: string } | undefined;
        // Determine which text was matched
        const isEnglishMatch = row.matched_english.includes('<mark>');
        const matched_text = isEnglishMatch ? row.matched_english : row.matched_arabic;

        return {
          surah_id: row.surah_id,
          surah_name: surah ? `${surah.name_arabic} (${surah.name_english})` : `Surah ${row.surah_id}`,
          ayah_number: row.ayah_number,
          text_arabic: row.text_arabic,
          text_english: row.text_english,
          matched_text,
        };
      });
    } catch (err) {
      console.warn('FTS5 Search warning for query:', ftsQuery, err);
      return [];
    }
  }
}
