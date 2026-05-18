import { db } from '../db/index.ts';
import { SurahMeta, SurahDetail, Ayah } from '../types/index.ts';
import { CONFIG } from '../config/index.ts';

export class SurahRepository {
  private getAllStmt = db.prepare(`
    SELECT id, name_arabic, name_english, translation, revelation_type, total_ayahs
    FROM surahs
    ORDER BY id ASC
  `);

  private getSurahMetaStmt = db.prepare(`
    SELECT id, name_arabic, name_english, translation, revelation_type, total_ayahs
    FROM surahs
    WHERE id = ?
  `);

  private getAyahsStmt = db.prepare(`
    SELECT id, surah_id, ayah_number, text_arabic, text_english, transliteration, page_number, juz_number
    FROM ayahs
    WHERE surah_id = ?
    ORDER BY ayah_number ASC
  `);

  public getAllSurahs(): SurahMeta[] {
    return this.getAllStmt.all() as SurahMeta[];
  }

  public getSurahById(id: number): SurahDetail | null {
    const meta = this.getSurahMetaStmt.get(id) as SurahMeta | undefined;
    if (!meta) return null;

    const rawAyahs = this.getAyahsStmt.all(id) as Array<{
      id: number;
      surah_id: number;
      ayah_number: number;
      text_arabic: string;
      text_english: string;
      transliteration?: string;
      page_number?: number;
      juz_number?: number;
    }>;

    const sNum = id.toString().padStart(3, '0');
    const ayahs: Ayah[] = rawAyahs.map(a => {
      const aNum = a.ayah_number.toString().padStart(3, '0');
      return {
        ...a,
        audio_url: `${CONFIG.EVERYAYAH_BASE_URL}/${sNum}${aNum}.mp3`,
      };
    });

    return {
      ...meta,
      ayahs,
    };
  }
}
