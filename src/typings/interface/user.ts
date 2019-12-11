import { Document } from "mongoose"
import { role, status } from "./../enum/user"

export default interface IUser extends Document {
    avatar?: string
    bio?: string
    birthday?: Date
    email: string
    fullName?: string
    password: string
    role: role
    status: status
    username: string
}
