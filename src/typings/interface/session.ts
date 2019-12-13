import { Document } from "mongoose"
import IUser from "./user"

export default interface ISession extends Document {
    token: string
    user: IUser
    createdAt: Date
    updatedAt: Date
}
