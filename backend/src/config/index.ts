import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CONFIG = {
  PORT: Number(process.env.PORT) || 8000,
  DB_PATH: path.resolve(__dirname, '../../db/quran.sqlite'),
  EVERYAYAH_BASE_URL: 'https://everyayah.com/data/Alafasy_128kbps',
};
