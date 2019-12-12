import { Document } from "mongoose"
import { process } from "./../enum/verificationCode"
import IUser from "./user"

export default interface IVerificationCode extends Document {
    code: string
    data?: string,
    expiryDate: Date,
    process: process
    used: boolean
    user: IUser
}
