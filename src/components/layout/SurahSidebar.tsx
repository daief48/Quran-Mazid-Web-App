"use client";

import React, { useState, useMemo } from "react";
import { SurahMeta } from "../../types";

interface SurahSidebarProps {
  surahs: SurahMeta[];
  activeSurahId: number;
  onSelectSurah: (id: number) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const SurahSidebar: React.FC<SurahSidebarProps> = ({
  surahs,
  activeSurahId,
  onSelectSurah,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"surah" | "juz" | "page">("surah");

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        s.transliteration.toLowerCase().includes(q) ||
        s.name.includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        s.id.toString() === q
    );
  }, [surahs, searchQuery]);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        onClick={onCloseMobile}
        className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${
          isOpenMobile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar / Drawer Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[320px] sm:w-[360px] bg-[#171717] border-r border-[#262626] h-full shrink-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 flex flex-col shadow-2xl lg:shadow-none font-sans ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Drawer Header */}
        <div className="p-4 pb-2 lg:hidden flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-qmGreen font-bold shadow-md">
              <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.99183 0H29.0082C32.8696 0 36 3.13043 36 6.99183V29.0082C36 32.8696 32.8696 36 29.0082 36H6.99183C3.13043 36 0 32.8696 0 29.0082V6.99183C0 3.13043 3.13043 0 6.99183 0Z"
                  fill="#10B981"
                ></path>
                <path
                  d="M26.0687 24.5654V28.2374C26.0688 28.3545 26.0389 28.4696 25.9818 28.5717C25.9247 28.6739 25.8424 28.7597 25.7427 28.821C25.6429 28.8822 25.5292 28.9168 25.4122 28.9215C25.2953 28.9263 25.1791 28.9009 25.0748 28.8479L18 25.2596"
                  stroke="#E2E2E2"
                  strokeWidth="0.782609"
                ></path>
                <path
                  d="M9.92969 24.5654V28.2374C9.92957 28.3545 9.95949 28.4696 10.0166 28.5717C10.0737 28.6739 10.156 28.7597 10.2557 28.821C10.3554 28.8822 10.4692 28.9168 10.5861 28.9215C10.7031 28.9263 10.8193 28.9009 10.9236 28.8479L17.9976 25.2596"
                  stroke="#E2E2E2"
                  strokeWidth="0.782609"
                ></path>
                <path
                  opacity="0.35"
                  d="M17.5839 24.1444C17.5839 24.3737 17.7733 24.5591 18.0018 24.5591V25.5405L8.60421 23.6114L7.45143 23.3821C7.093 23.3109 6.77034 23.1177 6.53844 22.8353C6.30654 22.5528 6.17975 22.1987 6.17969 21.8333V10.8729C6.17969 9.90245 7.04838 9.16131 8.00708 9.31392L18.001 10.9026V11.884C17.8908 11.8842 17.7852 11.9279 17.7071 12.0056C17.629 12.0833 17.5847 12.1886 17.5839 12.2988V24.1436V24.1444Z"
                  fill="#E2E2E2"
                ></path>
                <path
                  opacity="0.35"
                  d="M18.4171 24.1444C18.4171 24.3737 18.2293 24.5591 18 24.5591V25.5405L27.3976 23.6114L28.5503 23.3821C28.9088 23.3109 29.2314 23.1177 29.4633 22.8353C29.6952 22.5528 29.822 22.1987 29.8221 21.8333V10.8729C29.8221 9.90245 28.9534 9.16131 27.9947 9.31392L18 10.9018V11.8832C18.2285 11.8832 18.4171 12.0687 18.4171 12.298V24.1436V24.1444Z"
                  fill="#E2E2E2"
                ></path>
                <path
                  d="M17.5806 24.1443C17.5806 24.3736 17.77 24.5591 17.9986 24.5591V25.5405L9.92986 22.0383L8.60099 21.4623C8.29824 21.3311 8.04048 21.1142 7.85944 20.8383C7.6784 20.5624 7.58197 20.2396 7.58203 19.9096V9.37417C7.58187 9.09963 7.64851 8.82918 7.7762 8.58615C7.9039 8.34312 8.08881 8.13482 8.31498 7.97921C8.54116 7.8236 8.8018 7.72536 9.07441 7.69297C9.34703 7.66058 9.62343 7.69501 9.87977 7.7933L17.9986 10.9026V11.884C17.8883 11.884 17.7824 11.9276 17.7041 12.0053C17.6259 12.083 17.5815 12.1885 17.5806 12.2988V24.1436V24.1443Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight tracking-wide">
                Quran Mazid
              </h1>
              <p className="text-[10px] text-qmTextSecondary leading-tight mt-0.5 font-medium">
                Read, Study, and Learn The Quran
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="w-8 h-8 rounded-full bg-[#262626] text-qmTextSecondary hover:text-white flex items-center justify-center transition cursor-pointer font-bold"
          >
            <i className="ph ph-x text-base font-bold"></i>
          </button>
        </div>

        {/* Tabs Header */}
        <div className="p-4 pb-3">
          <div className="bg-qmBgCard p-1 rounded-full flex text-center text-xs font-semibold border border-qmBorder/50">
            <button
              onClick={() => setActiveTab("surah")}
              className={`flex-1 py-2 rounded-full shadow transition font-medium tracking-wide ${
                activeTab === "surah" ? "bg-qmBgActive text-white" : "text-qmTextSecondary hover:text-white"
              }`}
            >
              Surah
            </button>
            <button
              onClick={() => setActiveTab("juz")}
              className={`flex-1 py-2 rounded-full transition font-medium tracking-wide ${
                activeTab === "juz" ? "bg-qmBgActive text-white" : "text-qmTextSecondary hover:text-white"
              }`}
            >
              Juz
            </button>
            <button
              onClick={() => setActiveTab("page")}
              className={`flex-1 py-2 rounded-full transition font-medium tracking-wide ${
                activeTab === "page" ? "bg-qmBgActive text-white" : "text-qmTextSecondary hover:text-white"
              }`}
            >
              Page
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-qmTextSecondary text-base font-bold"></i>
            <input
              type="text"
              placeholder="Search Surah"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-qmBgCard border border-qmBorder rounded-full py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-qmGreen transition font-sans"
            />
          </div>
        </div>

        {/* Surahs List */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1.5" id="surah-sidebar-list">
          {surahs.length === 0 ? (
            <div className="text-center text-qmTextSecondary py-12 animate-pulse text-sm">
              Loading Surahs...
            </div>
          ) : filteredSurahs.length === 0 ? (
            <div className="text-center text-qmTextSecondary py-12 text-sm">
              No Surahs found
            </div>
          ) : (
            filteredSurahs.map((s) => {
              const isActive = s.id === activeSurahId;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectSurah(s.id);
                    onCloseMobile();
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition border ${
                    isActive
                      ? "bg-gradient-to-r from-qmGreen/15 to-transparent border-qmGreen/40 text-white shadow-sm"
                      : "bg-transparent border-transparent hover:bg-qmBgActive hover:border-qmBorder text-qmTextSecondary hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold diamond-badge shrink-0 border ${
                        isActive
                          ? "bg-qmGreen/20 border-qmGreen text-qmGreen"
                          : "bg-qmBgActive border-qmBorder text-qmTextSecondary"
                      }`}
                    >
                      <span className="diamond-badge-content font-sans">{s.id}</span>
                    </div>
                    <div className="min-w-0 text-left">
                      <h3
                        className={`font-semibold text-sm truncate font-sans tracking-wide ${
                          isActive ? "text-white font-bold" : "text-qmTextPrimary"
                        }`}
                      >
                        {s.transliteration.replace("-", " ")}
                      </h3>
                      <p className="text-[11px] text-qmTextSecondary truncate mt-0.5 font-medium font-sans">
                        {s.translation} • {s.total_verses} Ayahs
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-noto text-lg font-semibold shrink-0 pl-2 ${
                      isActive ? "text-qmGreen" : "text-qmTextSecondary"
                    }`}
                  >
                    {s.name}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
};
