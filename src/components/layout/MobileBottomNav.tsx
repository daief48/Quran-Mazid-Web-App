"use client";

import React from "react";

interface MobileBottomNavProps {
  onOpenMobileDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenMobileDrawer,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#171717] border-t border-[#262626] z-50 flex justify-around items-center px-4 py-3 shadow-2xl">
      {/* Home (Pentagon) */}
      <a href="#" className="flex flex-col items-center text-qmGreen group" title="Home">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M12 3l9 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20.5v-11L12 3z" />
          <circle cx="12" cy="14" r="2.5" />
        </svg>
      </a>

      {/* Surahs (2x2 Grid) */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onOpenMobileDrawer();
        }}
        className="flex flex-col items-center text-qmTextSecondary hover:text-white transition"
        title="Surahs"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <circle cx="7" cy="7" r="3.5" opacity="0.9" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="2" opacity="0.45" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="2" opacity="0.45" />
          <circle cx="17" cy="17" r="3.5" opacity="0.9" />
        </svg>
      </a>

      {/* Community (Paper Plane) */}
      <a
        href="#"
        className="flex flex-col items-center text-qmTextSecondary hover:text-white transition"
        title="Community"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </a>

      {/* Bookmarks (Curved Ribbon) */}
      <a
        href="#"
        className="flex flex-col items-center text-qmTextSecondary hover:text-white transition"
        title="Bookmarks"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          <path d="M7 7h10" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </a>

      {/* Other Apps (3 Squares + Lines) */}
      <a
        href="#"
        className="flex flex-col items-center text-qmTextSecondary hover:text-white transition"
        title="Other Apps"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="14" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="4" y="14" width="6.5" height="6.5" rx="1.5" />
          <line x1="14" y1="16.5" x2="20" y2="16.5" />
          <line x1="14" y1="19.5" x2="20" y2="19.5" />
        </svg>
      </a>
    </div>
  );
};
