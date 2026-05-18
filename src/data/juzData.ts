export interface JuzEntry {
  juz: number;
  surahIds: number[];
}

// Standard Quranic Juz breakdown: which Surah IDs appear (partially or fully) in each Juz
export const JUZ_DATA: JuzEntry[] = [
  { juz: 1,  surahIds: [1, 2] },
  { juz: 2,  surahIds: [2] },
  { juz: 3,  surahIds: [2, 3] },
  { juz: 4,  surahIds: [3, 4] },
  { juz: 5,  surahIds: [4, 5] },
  { juz: 6,  surahIds: [5, 6] },
  { juz: 7,  surahIds: [6, 7] },
  { juz: 8,  surahIds: [7, 8] },
  { juz: 9,  surahIds: [8, 9] },
  { juz: 10, surahIds: [9, 10, 11] },
  { juz: 11, surahIds: [11, 12] },
  { juz: 12, surahIds: [12, 13, 14] },
  { juz: 13, surahIds: [15, 16] },
  { juz: 14, surahIds: [16, 17, 18] },
  { juz: 15, surahIds: [18, 19, 20] },
  { juz: 16, surahIds: [20, 21, 22] },
  { juz: 17, surahIds: [22, 23, 24] },
  { juz: 18, surahIds: [25, 26, 27] },
  { juz: 19, surahIds: [27, 28, 29] },
  { juz: 20, surahIds: [29, 30, 31, 32] },
  { juz: 21, surahIds: [32, 33, 34, 35, 36] },
  { juz: 22, surahIds: [36, 37, 38, 39] },
  { juz: 23, surahIds: [39, 40, 41] },
  { juz: 24, surahIds: [42, 43, 44] },
  { juz: 25, surahIds: [44, 45, 46] },
  { juz: 26, surahIds: [47, 48, 49, 50, 51] },
  { juz: 27, surahIds: [52, 53, 54, 55, 56, 57] },
  { juz: 28, surahIds: [58, 59, 60, 61, 62, 63, 64, 65, 66] },
  { juz: 29, surahIds: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77] },
  { juz: 30, surahIds: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114] },
];
