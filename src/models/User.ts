import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  referralCode: string;
  role: 'user' | 'admin';
  isSubscribed: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    resetToken: {
      type: String,
      default: undefined,
    },
    resetTokenExpiry: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

// Note: explicit index() calls removed — `unique: true` on the schema fields
// already creates unique indexes automatically.

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
