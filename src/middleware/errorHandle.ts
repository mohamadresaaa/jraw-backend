import { ErrorRequestHandler, NextFunction, Response } from "express"
import { unlinkSync } from "fs"
import { ErrorMessage, PublicErrorMessage } from "../lib/messages"
import { IRequest } from "../typings/interface/express"

export const apiErrorHandler: ErrorRequestHandler = (error: any, req: IRequest, res: Response, next: NextFunction) => {
  if (req.file) {
    unlinkSync(req.file.path)
  }

  switch (process.env.MODE || "development") {
    case "development":
      return res.status(error.status ? error.status : 500).json({
        message: error.message,
        stack: error.stack,
      })
    case "production":
      return res.status(error.status ? error.status : 500).json(new PublicErrorMessage(error))
  }
}

export const apiError404 = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    throw new PublicErrorMessage(ErrorMessage.errNotFound("Route"))
  } catch (error) {
    next(error)
  }
}
