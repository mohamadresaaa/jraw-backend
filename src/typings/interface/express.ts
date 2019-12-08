import { NextFunction, Request, Response } from "express"

export interface IRequest extends Request {
    value?: any
    body: any
    file?: any
}
