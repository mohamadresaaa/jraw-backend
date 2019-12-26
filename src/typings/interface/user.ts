import { Document, Model } from "mongoose"
import { ERole, EStatus } from "./../enum/user"

export interface IUser extends Document {
    avatar?: string
    bio?: string
    birthday?: Date
    email: string
    fullName?: string
    password: string
    role: ERole
    status: EStatus
    username: string
    comparePassword(password: string): boolean
    generateSession(): Promise<string>
    dataTransform(): any
}

export interface IUserModel extends Model<IUser> {}
