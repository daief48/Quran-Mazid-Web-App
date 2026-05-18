# 📖 Quran Mazid Full-Stack Web Application

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white)
![SQLite FTS5](https://img.shields.io/badge/SQLite_FTS5-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-764ABC?style=for-the-badge)

A premium, highly optimized full-stack web application inspired by **QuranMazid.com**. Designed to deliver an immersive Quran reading, listening, and studying experience with blazing-fast global search, customizable typography, and per-ayah recitation streaming.

---

## ✨ Key Features

*   **📖 Immersive Surah Reader:** Supports both Reading (Mushaf) and Translation layouts with dynamic Uthmani Arabic typography.
*   **🎧 Per-Ayah Audio Recitation:** High-quality streaming audio player with sticky navigation, continuous playback, and lazy loading.
*   **⚡ Global Full-Text Search (FTS5):** Blazing-fast search across Arabic text and English translations with keyword highlighting (`<mark>`).
*   **⚙️ Persistent Preferences:** Customize Arabic font faces (Amiri, Scheherazade, Noto Sans), font sizes, and themes with instant client hydration via Zustand.
*   **📱 Responsive Mobile UX:** Custom mobile bottom bar, sliding navigation drawers, and touch-optimized controls.

---

## 🏗️ Architecture & Tech Stack

```text
d:\QuranSphere\
├── src/                          # Next.js App Router (Frontend)
│   ├── app/                      # Next.js Pages & Layouts
│   ├── components/               # UI Components (Audio, Layout, Reader, Search)
│   ├── services/                 # Frontend API Clients (SWR / Fetch)
│   ├── store/                    # Zustand Persistent Settings Store
│   └── types/                    # Shared TypeScript Interfaces
└── backend/                      # Hono REST API (Backend)
    ├── src/
    │   ├── config/               # Environment Configuration
    │   ├── controllers/          # Route Handlers
    │   ├── db/                   # SQLite Connection & Seeder (seed.ts)
    │   ├── middleware/           # Standardized JSON Error Handler & CORS
    │   ├── repositories/         # Surah & FTS5 Search Database Logic
    │   ├── routes/               # Hono Router Definitions
    │   └── services/             # Business Logic Layer
    └── index.ts                  # Backend Entry Point (@hono/node-server)
```

---

## 🚀 Getting Started Locally

### 1. Backend Setup & Seeding (Terminal 1)

Navigate to the `backend` folder, install dependencies, seed the SQLite database with Quran data, and start the Hono server:

```bash
cd backend
npm install
npm run seed     # Fetches 114 Surahs & Ayahs into SQLite FTS5 database
npm run dev      # Starts Hono backend server on http://localhost:8000
```

### 2. Frontend Setup (Terminal 2)

From the project root, install frontend dependencies and start the Next.js dev server:

```bash
npm install
npm run dev      # Starts Next.js frontend on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

### 1. Surah List (`GET /api/surahs`)
Returns metadata for all 114 Surahs.
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name_arabic": "الفاتحة",
      "name_english": "Al-Faatiha",
      "translation": "The Opening",
      "revelation_type": "meccan",
      "total_ayahs": 7
    }
  ],
  "statusCode": 200,
  "timestamp": "2026-05-18T16:00:00.000Z"
}
```

### 2. Single Surah (`GET /api/surahs/:id`)
Returns complete Surah metadata along with all Ayahs, translations, and audio URLs.
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name_arabic": "الفاتحة",
    "name_english": "Al-Faatiha",
    "ayahs": [
      {
        "id": 1,
        "ayah_number": 1,
        "text_arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "text_english": "In the name of Allah, the Entirely Merciful...",
        "audio_url": "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
      }
    ]
  },
  "statusCode": 200
}
```

### 3. Global Full-Text Search (`GET /api/search?q=merciful`)
Searches across Arabic and English text using SQLite FTS5 engine, returning `<mark>` highlighted text.
```json
{
  "success": true,
  "data": {
    "query": "merciful",
    "total_results": 30,
    "results": [
      {
        "surah_id": 1,
        "surah_name": "الفاتحة (Al-Faatiha)",
        "ayah_number": 3,
        "text_arabic": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "text_english": "The Entirely Merciful, the Especially Merciful,",
        "matched_text": "The Entirely <mark>Merciful</mark>, the Especially <mark>Merciful</mark>,"
      }
    ]
  },
  "statusCode": 200
}
```

---

## 🌍 Production Deployment

*   **Frontend (Vercel):** Seamlessly deploys with zero-configuration Next.js build presets.
*   **Backend (Railway / Fly.io / Docker):** Deploys effortlessly as a Node.js service with a persistent volume to preserve the `quran.sqlite` database file.

---

## 🛡️ License & Acknowledgements
Built for the Ummah. Quranic text data sourced from open-source Islamic databases ([Quran.com API](https://quran.com) & [EveryAyah CDN](https://everyayah.com)).
