import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings, ViewMode, ArabicFont } from '../types';

interface SettingsStore extends AppSettings {
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  setArabicFont: (font: ArabicFont) => void;
  setViewMode: (mode: ViewMode) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      arabicFontSize: 34,
      translationFontSize: 17,
      arabicFont: 'amiri',
      viewMode: 'reading',
      setArabicFontSize: (arabicFontSize) => set({ arabicFontSize }),
      setTranslationFontSize: (translationFontSize) => set({ translationFontSize }),
      setArabicFont: (arabicFont) => set({ arabicFont }),
      setViewMode: (viewMode) => set({ viewMode }),
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'qm-settings-storage', // key in localStorage
    }
  )
);
