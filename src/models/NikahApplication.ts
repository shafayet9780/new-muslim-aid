import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * নিকাহ এইড আবেদন।
 * বেশিরভাগ উত্তর `answers` object এ (field-config driven) থাকে।
 * sorting/list এর জন্য কিছু গুরুত্বপূর্ণ field top-level এ রাখা হয়েছে।
 */
export interface INikahApplication extends Document {
  candidateName: string;
  lookingFor: string;
  guardianPhone: string;
  answers: Record<string, unknown>;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const NikahApplicationSchema = new Schema<INikahApplication>(
  {
    candidateName: { type: String, required: true, trim: true },
    lookingFor: { type: String, default: '', trim: true },
    guardianPhone: { type: String, default: '', trim: true },
    answers: { type: Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

NikahApplicationSchema.index({ createdAt: -1 });
NikahApplicationSchema.index({ candidateName: 1 });

const NikahApplication: Model<INikahApplication> =
  mongoose.models.NikahApplication ||
  mongoose.model<INikahApplication>('NikahApplication', NikahApplicationSchema);

export default NikahApplication;
