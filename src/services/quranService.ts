import { SurahMeta, AyahVerse } from "../types";

export const fallbackSurahs: SurahMeta[] = [
  { id: 1, name: "الفاتحة", transliteration: "Al-Fatihah", translation: "The Opener", type: "meccan", total_verses: 7 },
  { id: 2, name: "البقرة", transliteration: "Al-Baqarah", translation: "The Cow", type: "medinan", total_verses: 286 },
  { id: 3, name: "آل عمران", transliteration: "Al-Imran", translation: "Family of Imran", type: "medinan", total_verses: 200 },
  { id: 4, name: "النساء", transliteration: "An-Nisa", translation: "The Women", type: "medinan", total_verses: 176 },
  { id: 5, name: "المائدة", transliteration: "Al-Ma'idah", translation: "The Table Spread", type: "medinan", total_verses: 120 },
  { id: 6, name: "الأنعام", transliteration: "Al-An'am", translation: "The Cattle", type: "meccan", total_verses: 165 },
  { id: 7, name: "الأعراف", transliteration: "Al-A'raf", translation: "The Heights", type: "meccan", total_verses: 206 },
  { id: 8, name: "الأنفال", transliteration: "Al-Anfal", translation: "The Spoils of War", type: "medinan", total_verses: 75 },
  { id: 9, name: "التوبة", transliteration: "At-Tawbah", translation: "The Repentance", type: "medinan", total_verses: 129 },
  { id: 10, name: "يونس", transliteration: "Yunus", translation: "Jonah", type: "meccan", total_verses: 109 },
  { id: 18, name: "الكهف", transliteration: "Al-Kahf", translation: "The Cave", type: "meccan", total_verses: 110 },
  { id: 36, name: "يس", transliteration: "Ya-Sin", translation: "Ya Sin", type: "meccan", total_verses: 83 },
  { id: 55, name: "الرحمن", transliteration: "Ar-Rahman", translation: "The Beneficent", type: "medinan", total_verses: 78 },
  { id: 67, name: "الملك", transliteration: "Al-Mulk", translation: "The Sovereignty", type: "meccan", total_verses: 30 },
  { id: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", translation: "The Sincerity", type: "meccan", total_verses: 4 },
  { id: 113, name: "الفلق", transliteration: "Al-Falaq", translation: "The Daybreak", type: "meccan", total_verses: 5 },
  { id: 114, name: "الناس", transliteration: "An-Nas", translation: "Mankind", type: "meccan", total_verses: 6 }
];

export const fallbackFatihahVerses: AyahVerse[] = [
  { id: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", transliteration: "Bismillāhir-raḥmānir-raḥīm" },
  { id: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "[All] praise is [due] to Allah, Lord of the worlds -", transliteration: "Al-ḥamdu lillāhi rabbil-'ālamīn" },
  { id: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful,", transliteration: "Ar-raḥmānir-raḥīm" },
  { id: 4, text: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense.", transliteration: "Māliki yawmid-dīn" },
  { id: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help.", transliteration: "Iyyāka na'budu wa iyyāka nasta'īn" },
  { id: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -", transliteration: "Ihdinaṣ-ṣirāṭal-mustaqīm" },
  { id: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.", transliteration: "Ṣirāṭal-lażīna an'amta 'alayhim ghayril-maghḍūbi 'alayhim wa laḍ-ḍāllīn" }
];

const fetchWithTimeout = async (url: string, timeout = 3000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export async function fetchSurahs(): Promise<SurahMeta[]> {
  try {
    const res = await fetchWithTimeout("https://cdn.jsdelivr.net/gh/risan/quran-json@main/data/surahs.json");
    if (!res.ok) throw new Error("Failed to fetch surahs");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback surahs data due to network issue", err);
    return fallbackSurahs;
  }
}

export async function fetchSurahVerses(surahId: number): Promise<AyahVerse[]> {
  try {
    const res = await fetchWithTimeout(`https://cdn.jsdelivr.net/gh/risan/quran-json@main/data/surahs/${surahId}.json`);
    if (!res.ok) throw new Error("Failed to fetch surah details");
    const data = await res.json();
    return data.verses;
  } catch (err) {
    console.warn("Using fallback verses data for surah", surahId, err);
    if (surahId === 1) return fallbackFatihahVerses;
    return [
      { id: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", transliteration: "Bismillāhir-raḥmānir-raḥīm" }
    ];
  }
}

export function getAudioUrl(surahId: number, ayahId: number): string {
  const sNum = surahId.toString().padStart(3, "0");
  const aNum = ayahId.toString().padStart(3, "0");
  return `https://everyayah.com/data/Alafasy_128kbps/${sNum}${aNum}.mp3`;
}

export function toArabicNumeral(n: number | string): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return n.toString().split("").map(d => arabicDigits[parseInt(d)] || d).join("");
}
