import { SurahMeta, SurahDetail, Ayah } from '../types/index.ts';
import { Surah } from '../models/Surah.ts';
import { Ayah as AyahModel } from '../models/Ayah.ts';
import { CONFIG } from '../config/index.ts';

export class SurahRepository {
  public async getAllSurahs(): Promise<SurahMeta[]> {
    const surahs = await Surah.find().sort({ id: 1 }).lean();
    return surahs.map((s: any) => ({
      id: s.id,
      name_arabic: s.name,
      name_english: s.transliteration,
      translation: s.translation,
      revelation_type: s.type,
      total_ayahs: s.total_verses
    })) as SurahMeta[];
  }

  public async getSurahById(id: number): Promise<SurahDetail | null> {
    const s: any = await Surah.findOne({ id }).lean();
    if (!s) return null;

    const rawAyahs: any[] = await AyahModel.find({ surah_id: id }).sort({ ayah_number: 1 }).lean();

    const sNum = id.toString().padStart(3, '0');
    const ayahs: Ayah[] = rawAyahs.map((a: any) => {
      const aNum = a.ayah_number.toString().padStart(3, '0');
      return {
        id: a.ayah_number,
        surah_id: a.surah_id,
        ayah_number: a.ayah_number,
        text_arabic: a.text,
        text_english: a.translation,
        transliteration: a.transliteration,
        audio_url: `${CONFIG.EVERYAYAH_BASE_URL}/${sNum}${aNum}.mp3`,
      };
    });

    return {
      id: s.id,
      name_arabic: s.name,
      name_english: s.transliteration,
      translation: s.translation,
      revelation_type: s.type,
      total_ayahs: s.total_verses,
      ayahs,
    } as SurahDetail;
  }
}
