import { Document } from "mongoose"
import IUser from "./user"

export default interface ISession extends Document {
    expiryDate: Date,
    token: string
    user: IUser
    createdAt: Date
    updatedAt: Date
}
