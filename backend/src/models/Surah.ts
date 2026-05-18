import mongoose, { Schema, Document } from "mongoose";

export interface ISurah extends Document {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
}

const SurahSchema = new Schema<ISurah>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  transliteration: { type: String, required: true },
  translation: { type: String, required: true },
  type: { type: String, required: true },
  total_verses: { type: Number, required: true }
});

export const Surah = mongoose.models.Surah || mongoose.model<ISurah>("Surah", SurahSchema);
