// backend/src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  preferences?: {
    diet: 'veg' | 'non-veg' | 'vegan';
    calorieTarget: number;
    allergies: string[];
  };
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    preferences: {
      diet: {
        type: String,
        enum: ['veg', 'non-veg', 'vegan'],
        default: 'veg',
      },
      calorieTarget: {
        type: Number,
        default: 2000,
      },
      allergies: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

// ✅ Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
