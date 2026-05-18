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
