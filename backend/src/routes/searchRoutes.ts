import { Hono } from 'hono';
import { SearchController } from '../controllers/searchController.ts';

const searchRoutes = new Hono();

searchRoutes.get('/', SearchController.search);

export default searchRoutes;
