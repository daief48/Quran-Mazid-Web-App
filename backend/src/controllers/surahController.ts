import { Context } from 'hono';
import { SurahService } from '../services/surahService.ts';
import { successResponse } from '../utils/response.ts';

const surahService = new SurahService();

export class SurahController {
  public static async getSurahs(c: Context) {
    const surahs = await surahService.getAllSurahs();
    return c.json(successResponse(surahs));
  }

  public static async getSurahById(c: Context) {
    const id = Number(c.req.param('id'));
    const surah = await surahService.getSurahById(id);
    return c.json(successResponse(surah));
  }
}
