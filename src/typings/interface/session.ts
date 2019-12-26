import { Document, Model } from "mongoose"
import { IUser } from "./user"

export interface ISession extends Document {
    expiryDate: Date,
    token: string
    user: IUser
    createdAt: Date
    updatedAt: Date
}

export interface ISessionModel extends Model<ISession> {}
