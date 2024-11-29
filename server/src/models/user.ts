import mongoose from "mongoose";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  bookedSlots: string[];
  __v: number;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookedSlots: { type: [String], default: [] },
});

const userModel = mongoose.model<User>("user", userSchema);

export { userModel, User };
