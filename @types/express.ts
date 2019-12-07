import { Request } from "express"

export interface IRequest extends Request {
    body: any
    file?: any
}
