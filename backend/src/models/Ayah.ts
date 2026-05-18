import mongoose, { Schema, Document } from "mongoose";

export interface IAyah extends Document {
  surah_id: number;
  ayah_number: number;
  text: string;
  translation: string;
  transliteration: string;
}

const AyahSchema = new Schema<IAyah>({
  surah_id: { type: Number, required: true, index: true },
  ayah_number: { type: Number, required: true },
  text: { type: String, required: true },
  translation: { type: String, required: true },
  transliteration: { type: String, required: true },
});

// Compound index for finding specific ayahs efficiently
AyahSchema.index({ surah_id: 1, ayah_number: 1 }, { unique: true });

// Text index for full-text search
AyahSchema.index(
  {
    text: "text",
    translation: "text",
    transliteration: "text"
  },
  {
    weights: {
      translation: 10,
      text: 5,
      transliteration: 2
    },
    name: "TextSearchIndex"
  }
);

export const Ayah = mongoose.models.Ayah || mongoose.model<IAyah>("Ayah", AyahSchema);
