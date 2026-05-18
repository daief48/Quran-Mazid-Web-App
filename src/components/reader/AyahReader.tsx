"use client";

import React from "react";
import { AyahVerse, AppSettings } from "../../types";
import { toArabicNumeral } from "../../services/quranService";

interface AyahReaderProps {
  verses: AyahVerse[];
  settings: AppSettings;
  onPlayAyah: (ayahId: number) => void;
  isLoading?: boolean;
}

export const AyahReader: React.FC<AyahReaderProps> = ({
  verses,
  settings,
  onPlayAyah,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-24 text-qmTextSecondary animate-pulse font-sans text-base">
        Loading Surah Ayahs...
      </div>
    );
  }

  const getFontFamilyClass = () => {
    switch (settings.arabicFont) {
      case "scheherazade":
        return "font-scheherazade";
      case "noto":
        return "font-noto";
      case "amiri":
      default:
        return "font-amiri";
    }
  };

  if (settings.viewMode === "reading") {
    return (
      <div className="bg-transparent px-2 py-6 md:p-8 rounded-3xl text-center md:text-justify leading-loose">
        <p
          className={`dynamic-arabic ${getFontFamilyClass()} text-white tracking-wide leading-[75px]`}
          style={{ direction: "rtl", fontSize: `${settings.arabicFontSize}px` }}
        >
          {verses.map((ayah) => (
            <React.Fragment key={ayah.id}>
              <span
                className="inline-block hover:text-qmGreen transition cursor-pointer relative group"
                onClick={() => onPlayAyah(ayah.id)}
              >
                {ayah.text}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-sans px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-50">
                  {ayah.translation}
                </span>
              </span>
              <span className="text-qmGreen mx-2 font-normal inline-block text-2xl md:text-3xl select-none align-middle font-sans">
                ۝{toArabicNumeral(ayah.id)}
              </span>
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  }

  // Translation Mode
  return (
    <div className="space-y-6">
      {verses.map((ayah) => (
        <div
          key={ayah.id}
          className="bg-qmBgSidebar border border-qmBorder/50 rounded-2xl p-5 md:p-7 hover:border-qmGreen/30 transition shadow-sm group"
        >
          {/* Top Bar: Verse Number & Play */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-qmBorder/50">
            <div className="w-10 h-10 rounded-xl bg-qmBgActive border border-qmBorder flex items-center justify-center text-sm font-bold text-qmTextSecondary diamond-badge shadow-inner">
              <span className="diamond-badge-content font-sans">{ayah.id}</span>
            </div>
            <button
              onClick={() => onPlayAyah(ayah.id)}
              className="text-qmTextSecondary hover:text-qmGreen transition flex items-center gap-2 cursor-pointer bg-qmBgActive px-3 py-1.5 rounded-full text-xs font-medium border border-qmBorder"
            >
              <i className="ph-fill ph-play text-sm"></i>
              <span>Play</span>
            </button>
          </div>

          {/* Arabic Text */}
          <div
            className={`text-right text-white leading-loose ${getFontFamilyClass()} dynamic-arabic`}
            style={{ direction: "rtl", fontSize: `${settings.arabicFontSize}px` }}
          >
            {ayah.text}
          </div>

          {/* Transliteration & Translation */}
          <div className="mt-8 space-y-3 font-sans">
            <p className="text-qmGreen font-medium text-sm md:text-base leading-relaxed">
              {ayah.transliteration}
            </p>
            <p
              className="text-qmTextSecondary leading-relaxed dynamic-trans"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              {ayah.translation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
