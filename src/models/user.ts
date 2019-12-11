import mongoose, { Schema } from "mongoose"
import IUser from "../typings/interface/user"
import { ErrorMessage } from "./../lib/messages"

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
    default: "inactive",
    enum: ["active", "inactive", "block"],
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

// Manage and prevent copy information from being imported { email, username }
userSchema.post("save", function(error: any, doc: any, next: any) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new ErrorMessage("Exists Data", `${error.keyPattern.username ? "Username" : "Email"} is already`, 422))
  } else {
    next()
  }
})

export default mongoose.model<IUser>("User", userSchema)
