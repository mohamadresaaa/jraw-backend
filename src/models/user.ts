import mongoose, { Schema } from "mongoose"
import IUser from "../typings/interface/user"

const userSchema = new Schema({
  avatar: {
    default: null,
    type: String,
  },
  bio: {
    default: null,
    type: String,
  },
  birthday: {
    default: null,
    type: Date,
  },
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  fullName: {
    default: null,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    default: "user",
    enum: ["user", "admin"],
    type: String,
  },
  status: {
    default: "deactivated",
    enum: ["activated", "deactivated", "blocked"],
    type: String,
  },
  username: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
}, { timestamps: true })

export default mongoose.model<IUser>("User", userSchema)
