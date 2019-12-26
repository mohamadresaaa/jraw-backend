import { Document } from "mongoose"
import { ISessionModel } from "./session"
import { IUserModel } from "./user"
import { IVerificationCodeModel } from "./verificationCode"

export declare interface IModels {
    session: ISessionModel
    user: IUserModel
    verificationCode: IVerificationCodeModel
}
