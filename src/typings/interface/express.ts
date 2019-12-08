import { NextFunction, Request, Response } from "express"

export interface IRequest extends Request {
    body: any
    file?: any
}
