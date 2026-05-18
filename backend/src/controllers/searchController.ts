import { Context } from 'hono';
import { SearchService } from '../services/searchService.ts';
import { successResponse } from '../utils/response.ts';

const searchService = new SearchService();

export class SearchController {
  public static async search(c: Context) {
    const q = c.req.query('q') || '';
    const limit = Number(c.req.query('limit')) || 30;
    
    const results = searchService.search(q, limit);
    return c.json(successResponse(results));
  }
}
