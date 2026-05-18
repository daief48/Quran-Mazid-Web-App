import { SearchRepository } from '../repositories/searchRepository.ts';
import { SearchResponse } from '../types/index.ts';

export class SearchService {
  private repository: SearchRepository;

  constructor() {
    this.repository = new SearchRepository();
  }

  public async search(query: string, limit = 30): Promise<SearchResponse> {
    if (!query || query.trim().length < 2) {
      return {
        query,
        total_results: 0,
        results: [],
      };
    }

    const results = await this.repository.searchQuran(query, limit);

    return {
      query,
      total_results: results.length,
      results,
    };
  }
}
