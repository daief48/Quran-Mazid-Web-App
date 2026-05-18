import { SurahRepository } from '../repositories/surahRepository.ts';
import { SurahMeta, SurahDetail } from '../types/index.ts';

export class SurahService {
  private repository: SurahRepository;

  constructor() {
    this.repository = new SurahRepository();
  }

  public getAllSurahs(): SurahMeta[] {
    return this.repository.getAllSurahs();
  }

  public getSurahById(id: number): SurahDetail {
    if (isNaN(id) || id < 1 || id > 114) {
      throw new Error('Invalid surah ID. Must be between 1 and 114.');
    }
    const surah = this.repository.getSurahById(id);
    if (!surah) {
      throw new Error(`Surah ${id} not found.`);
    }
    return surah;
  }
}
