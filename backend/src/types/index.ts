export interface SurahMeta {
  id: number;
  name_arabic: string;
  name_english: string;
  translation: string;
  revelation_type: 'meccan' | 'medinan';
  total_ayahs: number;
}

export interface Ayah {
  id: number;
  surah_id: number;
  ayah_number: number;
  text_arabic: string;
  text_english: string;
  transliteration?: string;
  audio_url: string;
  page_number?: number;
  juz_number?: number;
}

export interface SurahDetail extends SurahMeta {
  ayahs: Ayah[];
}

export interface SearchResultItem {
  surah_id: number;
  surah_name: string;
  ayah_number: number;
  text_arabic: string;
  text_english: string;
  matched_text: string;
}

export interface SearchResponse {
  query: string;
  total_results: number;
  results: SearchResultItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
  timestamp: string;
}
