import { Document } from "mongoose"
import IUser from "./user"

export default interface IVerificationCode extends Document {
    code: string
    field: string
    user: IUser
    createdAt: Date
    updatedAt: Date
    isExpired(): boolean
}
