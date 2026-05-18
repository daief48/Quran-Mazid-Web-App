"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { IconSidebar } from "./IconSidebar";
import { SurahSidebar } from "./SurahSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { SettingsDrawer } from "../settings/SettingsDrawer";
import { SearchModal } from "../search/SearchModal";
import { SurahHeader } from "../reader/SurahHeader";
import { AyahReader } from "../reader/AyahReader";
import { PillNav } from "../reader/PillNav";
import { AudioPlayer } from "../audio/AudioPlayer";

import { SurahMeta, AyahVerse, AppSettings } from "../../types";
import { fetchSurahs, fetchSurahVerses, getAudioUrl } from "../../services/quranService";
import { useSettingsStore } from "../../store/useSettingsStore";

export const AppShell: React.FC = () => {
  // Global State
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [activeSurahId, setActiveSurahId] = useState<number>(1);
  const [verses, setVerses] = useState<AyahVerse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(true);

  // Settings State from Zustand Store
  const { arabicFontSize, translationFontSize, arabicFont, viewMode, updateSettings } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings: AppSettings = mounted ? {
    arabicFontSize,
    translationFontSize,
    arabicFont,
    viewMode,
  } : {
    arabicFontSize: 34,
    translationFontSize: 17,
    arabicFont: "amiri",
    viewMode: "reading",
  };

  // UI State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Audio State
  const [activeAudioAyahId, setActiveAudioAyahId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize
  useEffect(() => {
    fetchSurahs().then(setSurahs);
  }, []);

  // Fetch Verses when Surah changes
  useEffect(() => {
    setIsLoadingVerses(true);
    setActiveAudioAyahId(null);
    setIsPlaying(false);
    fetchSurahVerses(activeSurahId).then((data) => {
      setVerses(data);
      setIsLoadingVerses(false);
    });
  }, [activeSurahId]);

  const activeSurahMeta = surahs.find((s) => s.id === activeSurahId) || null;

  // Audio Controls
  const handlePlayAyah = (ayahId: number) => {
    if (activeAudioAyahId === ayahId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveAudioAyahId(ayahId);
      setIsPlaying(true);
    }
  };

  const handleNextAyah = () => {
    if (activeAudioAyahId && activeAudioAyahId < verses.length) {
      setActiveAudioAyahId(activeAudioAyahId + 1);
      setIsPlaying(true);
    }
  };

  const handlePrevAyah = () => {
    if (activeAudioAyahId && activeAudioAyahId > 1) {
      setActiveAudioAyahId(activeAudioAyahId - 1);
      setIsPlaying(true);
    }
  };

  const audioUrl = activeAudioAyahId ? getAudioUrl(activeSurahId, activeAudioAyahId) : "";

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <IconSidebar />

      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <div className="flex-1 flex overflow-hidden relative">
          <SurahSidebar
            surahs={surahs}
            activeSurahId={activeSurahId}
            onSelectSurah={setActiveSurahId}
            isOpenMobile={isMobileDrawerOpen}
            onCloseMobile={() => setIsMobileDrawerOpen(false)}
          />

          <main className="flex-1 h-full overflow-y-auto relative" id="main-reader">
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 pb-40">
              <SurahHeader surah={activeSurahMeta} />

              <AyahReader
                verses={verses}
                settings={settings}
                isLoading={isLoadingVerses}
                onPlayAyah={handlePlayAyah}
              />

              {!isLoadingVerses && (
                <PillNav
                  onPrev={() => setActiveSurahId((id) => Math.max(1, id - 1))}
                  onNext={() => setActiveSurahId((id) => Math.min(114, id + 1))}
                  disablePrev={activeSurahId === 1}
                  disableNext={activeSurahId === 114}
                />
              )}
            </div>
          </main>

          <SettingsDrawer
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onSettingsChange={(newSettings) => updateSettings(newSettings)}
          />

          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectResult={(surahId, ayahNum) => {
              setActiveSurahId(surahId);
              setTimeout(() => handlePlayAyah(ayahNum), 500);
            }}
          />
        </div>
      </div>

      <MobileBottomNav onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />

      {/* Audio Player Sticky Bar */}
      {activeAudioAyahId !== null && (
        <AudioPlayer
          audioUrl={audioUrl}
          isPlaying={isPlaying}
          surahId={activeSurahId}
          surahName={activeSurahMeta?.transliteration.replace("-", " ") || ""}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onNext={handleNextAyah}
          onPrev={handlePrevAyah}
          onClose={() => {
            setActiveAudioAyahId(null);
            setIsPlaying(false);
          }}
          onEnded={handleNextAyah}
        />
      )}
    </div>
  );
};
