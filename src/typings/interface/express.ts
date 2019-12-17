import { Request } from "express"
import IUser from "./user"

export interface IRequest extends Request {
    value?: any
    body: any
    file?: any
    user?: IUser | null
}
