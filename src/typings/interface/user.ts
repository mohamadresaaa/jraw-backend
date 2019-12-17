import { Document } from "mongoose"
import { ERole, EStatus } from "./../enum/user"

export default interface IUser extends Document {
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
