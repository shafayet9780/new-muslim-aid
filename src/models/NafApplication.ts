import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * NAF — নওমুসলিমদের জন্ম নিবন্ধনে নাম পরিবর্তন সহায়তা আবেদন।
 * বেশিরভাগ উত্তর `answers` object এ থাকে; sorting/list এর জন্য
 * কিছু গুরুত্বপূর্ণ field top-level এ রাখা হয়েছে।
 */
export interface INafApplication extends Document {
  newNameBn: string;
  phone: string;
  birthDate?: string;
  answers: Record<string, unknown>;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  /** জন্ম নিবন্ধনে নাম পরিবর্তন মেইল সফলভাবে পাঠানো হয়েছে কি না */
  emailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NafApplicationSchema = new Schema<INafApplication>(
  {
    newNameBn: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    birthDate: { type: String, default: '' },
    answers: { type: Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'archived'],
      default: 'new',
    },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NafApplicationSchema.index({ createdAt: -1 });
NafApplicationSchema.index({ newNameBn: 1 });

const NafApplication: Model<INafApplication> =
  mongoose.models.NafApplication ||
  mongoose.model<INafApplication>('NafApplication', NafApplicationSchema);

export default NafApplication;
