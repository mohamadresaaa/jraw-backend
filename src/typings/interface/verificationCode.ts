import { Document, Model } from "mongoose"
import { EAction } from "./../enum/verificationCode"
import { IUser } from "./user"

export default interface IVerificationCode extends Document {
    code: string
    expiryDate: Date,
    action: EAction
    used: boolean
    user: IUser
}

export interface IVerificationCodeModel extends Model<IVerificationCode> {}
