export interface SurahMeta {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface AyahVerse {
  id: number;
  text: string;
  translation: string;
  transliteration: string;
}

export interface SurahDetail {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
  verses: AyahVerse[];
}

export type ViewMode = "reading" | "translation";
export type ArabicFont = "amiri" | "scheherazade" | "noto";

export interface AppSettings {
  arabicFontSize: number;
  translationFontSize: number;
  arabicFont: ArabicFont;
  viewMode: ViewMode;
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

