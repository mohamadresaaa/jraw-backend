import { ISession, ISessionModel } from "./session"
import { IUser, IUserModel } from "./user"
import { IVerificationCode, IVerificationCodeModel } from "./verificationCode"

export declare interface IModels {
    session: ISessionModel
    user: IUserModel
    verificationCode: IVerificationCodeModel
}

export declare interface IDocuments {
    session: ISession
    user: IUser
    verificationCode: IVerificationCode
}
