import { Document } from "mongoose"

export enum role {
    user = "user",
    admin = "admin",
}

export enum status {
    activated = "activated",
    deactivated = "deactivated",
    blocked = "blocked",
}

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
