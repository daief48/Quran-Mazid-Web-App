import { Hono } from 'hono';
import { SurahController } from '../controllers/surahController.ts';

const surahRoutes = new Hono();

surahRoutes.get('/', SurahController.getSurahs);
surahRoutes.get('/:id', SurahController.getSurahById);

export default surahRoutes;
