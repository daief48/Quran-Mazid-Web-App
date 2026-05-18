"use client";

import React from "react";
import { AppSettings, ViewMode, ArabicFont } from "../../types";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (newSettings: AppSettings) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 w-[340px] bg-qmBgSidebar border-l border-qmBorder z-40 transform transition-transform duration-300 flex flex-col h-full shadow-2xl font-sans ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-qmBorder">
          <h2 className="font-bold text-white text-lg flex items-center gap-2 tracking-wide">
            <i className="ph-fill ph-gear text-qmGreen"></i> Settings
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-qmBgActive text-qmTextSecondary hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <i className="ph ph-x text-lg font-bold"></i>
          </button>
        </div>

        {/* Drawer Tabs (View Mode) */}
        <div className="p-6 pb-2">
          <div className="bg-qmBgCard p-1 rounded-full flex text-center text-xs font-semibold border border-qmBorder/50">
            <button
              onClick={() => updateSetting("viewMode", "translation")}
              className={`flex-1 py-2 rounded-full transition tracking-wide ${
                settings.viewMode === "translation"
                  ? "bg-qmBgActive text-white shadow"
                  : "text-qmTextSecondary hover:text-white"
              }`}
            >
              Translation
            </button>
            <button
              onClick={() => updateSetting("viewMode", "reading")}
              className={`flex-1 py-2 rounded-full transition tracking-wide ${
                settings.viewMode === "reading"
                  ? "bg-qmBgActive text-white shadow"
                  : "text-qmTextSecondary hover:text-white"
              }`}
            >
              Reading
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="border-b border-qmBorder pb-6 space-y-4">
            <div className="flex items-center justify-between cursor-pointer group">
              <h3 className="font-semibold text-white flex items-center gap-2.5 tracking-wide">
                <i className="ph ph-sliders text-qmGreen text-lg"></i> Reading Settings
              </h3>
            </div>

            <div className="space-y-6 pt-3">
              {/* Arabic Font Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white">Arabic Font Size</span>
                  <span className="text-qmGreen font-bold">{settings.arabicFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="60"
                  step="1"
                  value={settings.arabicFontSize}
                  onChange={(e) => updateSetting("arabicFontSize", parseInt(e.target.value))}
                  className="w-full h-1.5 bg-qmBgActive rounded-lg appearance-none cursor-pointer accent-qmGreen"
                />
              </div>

              {/* Translation Font Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white">Translation Size</span>
                  <span className="text-qmGreen font-bold">{settings.translationFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="30"
                  step="1"
                  value={settings.translationFontSize}
                  onChange={(e) => updateSetting("translationFontSize", parseInt(e.target.value))}
                  className="w-full h-1.5 bg-qmBgActive rounded-lg appearance-none cursor-pointer accent-qmGreen"
                />
              </div>

              {/* Arabic Font Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block mb-1">
                  Arabic Font Face
                </label>
                <select
                  value={settings.arabicFont}
                  onChange={(e) => updateSetting("arabicFont", e.target.value as ArabicFont)}
                  className="w-full bg-qmBgActive border border-qmBorder rounded-xl p-3 text-sm text-white focus:outline-none focus:border-qmGreen cursor-pointer font-sans"
                >
                  <option value="scheherazade">Scheherazade New</option>
                  <option value="amiri">Amiri Quran</option>
                  <option value="noto">Noto Sans Arabic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Help Spread Islam Banner */}
          <div className="bg-gradient-to-br from-qmGreen/20 to-emerald-950 border border-qmGreen/30 rounded-2xl p-5 space-y-3 mt-8">
            <h4 className="font-bold text-white text-base">Help spread Islam</h4>
            <p className="text-xs text-qmTextSecondary leading-relaxed">
              Your support helps us reach millions with the beautiful message of the Quran.
            </p>
            <a
              href="https://irdfoundation.com/sadaqa-jaria"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-qmGreen hover:bg-[#178551] text-white py-2.5 rounded-xl font-semibold text-xs transition"
            >
              Support Us
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
