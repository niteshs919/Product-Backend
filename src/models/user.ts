import mongoose, { Schema, Document, Types } from 'mongoose';

export interface User extends Document {
  _id: Types.ObjectId; // ✅ Explicitly define _id type
  email: string;
  password: string;
  city: string;
  address: string;
  companyName: string;
  photo: string;
  refreshToken?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  companyName: { type: String, required: true },
  photo: { type: String, required: true },
  refreshToken: { type: String },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
