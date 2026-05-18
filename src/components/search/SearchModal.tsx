"use client";

import React, { useState, useEffect } from "react";
import { searchQuran } from "../../services/quranService";
import { SearchResponse, SearchResultItem } from "../../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (surahId: number, ayahNumber: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const id = setTimeout(() => {
      searchQuran(query).then((data: SearchResponse) => {
        setResults(data.results || []);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pointer-events-none font-sans">
        <div className="bg-qmBgSidebar w-full max-w-2xl rounded-3xl border border-qmBorder shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh] animate-scale-up">
          {/* Search Header Input */}
          <div className="p-5 border-b border-qmBorder flex items-center gap-4 bg-qmBgActive/50">
            <i className="ph ph-magnifying-glass text-xl text-qmGreen font-bold"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Arabic text or English translation (e.g. merciful, light, صلاة)..."
              autoFocus
              className="bg-transparent flex-1 border-none text-white focus:outline-none text-base placeholder:text-qmTextSecondary/70 font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-qmTextSecondary hover:text-white transition cursor-pointer"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-qmTextSecondary hover:text-white border-l border-qmBorder pl-4 py-1 transition cursor-pointer text-xs uppercase font-bold tracking-wider"
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-qmBorder/50">
            {loading ? (
              <div className="py-16 text-center text-qmTextSecondary animate-pulse text-sm font-medium">
                Searching Quran...
              </div>
            ) : results.length > 0 ? (
              results.map((item, idx) => (
                <div
                  key={`${item.surah_id}-${item.ayah_number}-${idx}`}
                  onClick={() => {
                    onSelectResult(item.surah_id, item.ayah_number);
                    onClose();
                  }}
                  className="p-4 hover:bg-qmBgActive/80 rounded-2xl transition cursor-pointer group flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs text-qmTextSecondary font-semibold">
                    <span className="text-qmGreen flex items-center gap-1.5 font-bold">
                      <i className="ph-fill ph-book-open"></i> {item.surah_name}
                    </span>
                    <span className="bg-qmBgCard px-2.5 py-1 rounded-lg border border-qmBorder/80">
                      Ayah {item.ayah_number}
                    </span>
                  </div>

                  {/* Highlighted Matched Text */}
                  <p
                    className="text-white text-sm leading-relaxed font-sans [&>mark]:bg-qmGreen/30 [&>mark]:text-qmGreen [&>mark]:px-1.5 [&>mark]:py-0.5 [&>mark]:rounded font-medium"
                    dangerouslySetInnerHTML={{ __html: item.matched_text }}
                  />
                </div>
              ))
            ) : query.trim().length >= 2 ? (
              <div className="py-16 text-center text-qmTextSecondary text-sm font-medium">
                No verses matched &quot;{query}&quot;.
              </div>
            ) : (
              <div className="py-16 text-center text-qmTextSecondary/60 text-xs font-medium flex flex-col items-center gap-3">
                <i className="ph ph-magnifying-glass text-4xl text-qmGreen/30"></i>
                <span>Type at least 2 characters to search the entire Quran.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
