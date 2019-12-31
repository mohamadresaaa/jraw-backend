import { compare, genSaltSync, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose, { Schema } from "mongoose"
import {IUser} from "../typings/interface/user"
import { config } from "./../config"
import { ErrorMessage } from "./../lib/messages"
import Session from "./session"

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
  firstName: {
    default: null,
    type: String,
  },
  lastName: {
    default: null,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    default: 1,
    type: Number,
  },
  status: {
    default: 2,
    type: Number,
  },
  username: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
}, { timestamps: true })

// Index fields
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
userSchema.index({ createdAt: -1 })

userSchema.pre<IUser>("save", async function(next) {
  try {
    // If password modified, hash it
    if (this.isModified("password")) {
      this.password = await hash(this.password, genSaltSync(15))
      next()
    }
  } catch (err) {
    next(err)
  }
})

/** Compare passwords
 * @param password
 * @return true/false
 */
userSchema.methods.comparePassword = async function(password: string) {
  return compare(password, this.password)
}

/** Create session if user login is successful and return jwt token
 * @param expiryDate
 * @returns token
 */
userSchema.methods.generateSession = async function(): Promise<string> {
  // Generate jwt token
  const token = jwt.sign({
    iss: "jraw",
    sub: this.id,
  }, config.server.publicKey + config.server.privateKey)

  // Create session
  await new Session({
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    token,
    user: this.id,
  }).save()

  // Return token
  return token
}

/** Convert and customize user information */
userSchema.methods.dataTransform = function(): any {
  return {
    avatar: this.avatar,
    bio: this.bio,
    birthday: this.birthday ? this.birthday.toISOString().slice(0, 10) : this.birthday,
    email: this.email,
    firstName: this.firstName,
    fullName: `${this.firstName} ${this.lastName}`,
    lastName: this.lastName,
    role: this.role,
    username: this.username,
  }
}

export default mongoose.model<IUser>("User", userSchema)
