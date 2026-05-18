"use client";

import React, { useEffect, useRef } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  surahId: number;
  surahName: string;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onEnded: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isPlaying,
  surahId,
  surahName,
  onTogglePlay,
  onNext,
  onPrev,
  onClose,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Audio play failed:", error);
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, audioUrl]);

  return (
    <div
      className={`fixed bottom-0 md:bottom-0 left-0 md:left-[70px] right-0 bg-qmBgSidebar/95 backdrop-blur border-t border-qmGreen p-4 z-50 transform transition-transform duration-300 flex items-center justify-between px-6 md:px-10 shadow-2xl font-sans`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-qmGreen/15 border border-qmGreen flex items-center justify-center text-qmGreen text-base font-bold diamond-badge shrink-0">
          <span className="diamond-badge-content font-sans">{surahId}</span>
        </div>
        <div className="pl-1">
          <h4 className="font-bold text-white text-sm md:text-base tracking-wide font-sans">
            {surahName}
          </h4>
          <p className="text-xs text-qmTextSecondary mt-0.5 font-medium font-sans">
            Mishary Rashid Alafasy
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onPrev}
          className="text-qmTextSecondary hover:text-white transition cursor-pointer"
        >
          <i className="ph ph-skip-back text-2xl"></i>
        </button>
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full bg-qmGreen text-white flex items-center justify-center hover:scale-105 transition shadow-lg shadow-qmGreen/30 cursor-pointer"
        >
          <i className={`ph-fill ${isPlaying ? "ph-pause" : "ph-play"} text-2xl`}></i>
        </button>
        <button
          onClick={onNext}
          className="text-qmTextSecondary hover:text-white transition cursor-pointer"
        >
          <i className="ph ph-skip-forward text-2xl"></i>
        </button>
        <button
          onClick={onClose}
          className="text-qmTextSecondary hover:text-red-400 ml-6 transition cursor-pointer"
        >
          <i className="ph ph-x text-xl font-bold"></i>
        </button>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={onEnded}
        className="hidden"
      ></audio>
    </div>
  );
};
