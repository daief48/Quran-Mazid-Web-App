"use client";

import React from "react";
import Image from "next/image";
import { SurahMeta } from "../../types";

interface SurahHeaderProps {
  surah: SurahMeta | null;
}

export const SurahHeader: React.FC<SurahHeaderProps> = ({ surah }) => {
  if (!surah) return null;

  const showBismillah = surah.id !== 1 && surah.id !== 9;

  return (
    <>
      {/* Surah Title Section */}
      <div className="flex items-center justify-center relative pb-8 mb-4">
        {/* Subtle Kaaba / Makkah Background Illustration */}
        <div className="absolute left-0 opacity-40 w-36 md:w-44 h-28 flex items-center pointer-events-none select-none">
          <Image
            src="/makkah.png"
            alt="Makkah Illustration"
            fill
            className="object-contain filter contrast-125 mix-blend-screen"
            priority
          />
        </div>

        <div className="text-center space-y-1.5 z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide font-sans">
            Surah {surah.transliteration.replace("-", " ")}
          </h1>
          <p className="text-xs md:text-sm text-qmTextSecondary font-medium tracking-wide">
            Ayah {surah.total_verses.toString().padStart(2, "0")} -{" "}
            {surah.type.charAt(0).toUpperCase() + surah.type.slice(1)}
          </p>
        </div>
      </div>

      {/* Sub Header Info Bar */}
      <div className="flex justify-between items-center text-xs md:text-sm text-qmTextSecondary font-medium py-3.5 my-8 px-2 border-t border-b border-qmBorder/50 font-sans">
        <span>{surah.transliteration.replace("-", " ")}</span>
        <span>Page: {surah.id.toString().padStart(2, "0")}</span>
        <span>Juz: 01</span>
      </div>

      {/* Bismillah Header */}
      {showBismillah && (
        <div className="text-center pb-10 mb-10 border-b border-qmBorder/60">
          <span className="font-scheherazade text-3xl md:text-4xl text-white tracking-wider">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </span>
        </div>
      )}
    </>
  );
};
