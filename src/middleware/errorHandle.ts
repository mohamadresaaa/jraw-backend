import fs from "fs"
import { ErrorMessage, PublicErrorMessage } from "../lib/messages"

export const apiErrorHandler = (error: any, req: any, res: any, next: any) => {
  if (req.file) {
    fs.unlinkSync(req.file.path)
  }

  switch (process.env.MODE || "development") {
    case "development":
      res.status(error.status ? error.status : 500).json({
        message: error.message,
        stack: error.stack,
      })
      break
    case "production":
      res.status(error.status ? error.status : 500).json(new PublicErrorMessage(error))
      break
  }
}

export const apiError404 = (req: any, res: any, next: any) => {
  try {
    throw new PublicErrorMessage(ErrorMessage.errNotFound("route"))
  } catch (error) {
    next(error)
  }
}
