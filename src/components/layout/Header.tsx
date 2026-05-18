"use client";

import React from "react";

interface HeaderProps {
  onOpenMobileDrawer: () => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileDrawer,
  onOpenSettings,
  onOpenSearch,
}) => {
  return (
    <header className="h-[70px] bg-qmBgSidebar border-b border-qmBorder flex items-center justify-between px-6 z-20 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileDrawer}
          className="md:hidden w-10 h-10 rounded-xl bg-qmGreen/10 border border-qmGreen/20 text-qmGreen flex items-center justify-center cursor-pointer hover:bg-qmGreen/20 transition shadow-sm font-bold"
          title="Open Surah List"
        >
          <i className="ph ph-list text-2xl font-bold"></i>
        </button>
        <div className="text-left">
          <h1 className="text-lg font-bold leading-none text-white tracking-wide font-sans">
            Quran Mazid
          </h1>
          <p className="text-[11px] text-qmTextSecondary mt-1 font-medium font-sans">
            Read, Study, and Learn The Quran
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 font-sans">
        <button
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-full bg-qmGreen/10 text-qmGreen hover:bg-qmGreen/20 flex items-center justify-center transition cursor-pointer font-bold shadow-sm"
          title="Search"
        >
          <i className="ph ph-magnifying-glass text-lg font-bold"></i>
        </button>
        <button
          className="w-10 h-10 rounded-full bg-qmGreen/10 text-qmGreen hover:bg-qmGreen/20 flex items-center justify-center transition cursor-pointer font-bold shadow-sm"
          title="Toggle Theme"
        >
          <i className="ph ph-circle-half-tilt text-lg font-bold"></i>
        </button>
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-full bg-qmGreen/10 text-qmGreen hover:bg-qmGreen/20 flex items-center justify-center transition cursor-pointer font-bold shadow-sm"
          title="Open Settings"
        >
          <i className="ph-fill ph-gear text-lg font-bold"></i>
        </button>
        <a
          href="https://irdfoundation.com/sadaqa-jaria"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex bg-[#388E3C] hover:bg-[#2e7531] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition items-center shadow-lg shadow-qmGreen/10"
        >
          <span>Support Us</span>
          <div className="relative inline-flex items-center justify-center w-6 h-6 ml-1.5">
            <i className="ph-fill ph-heart text-lg text-emerald-200/50 absolute -left-0.5 -top-0.5"></i>
            <i className="ph-fill ph-heart text-xs text-white absolute right-0.5 bottom-0.5"></i>
          </div>
        </a>
      </div>
    </header>
  );
};
