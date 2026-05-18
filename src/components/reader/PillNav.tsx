"use client";

import React from "react";

interface PillNavProps {
  onNext: () => void;
  onPrev: () => void;
  disableNext: boolean;
  disablePrev: boolean;
}

export const PillNav: React.FC<PillNavProps> = ({
  onNext,
  onPrev,
  disableNext,
  disablePrev,
}) => {
  return (
    <div className="pt-16 pb-12 flex justify-center items-center mt-12">
      <div className="inline-flex items-center bg-[#171717] border border-[#262626] rounded-full p-1.5 shadow-xl font-sans">
        <button
          onClick={onPrev}
          disabled={disablePrev}
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium text-qmTextSecondary hover:text-white transition disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Previous</span>
        </button>

        <div className="w-[1px] h-5 bg-[#262626] mx-1"></div>

        <button
          onClick={onNext}
          disabled={disableNext}
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium text-white hover:opacity-80 transition disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        >
          <span>Next</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
