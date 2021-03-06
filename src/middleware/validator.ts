import { ObjectSchema } from "@hapi/joi"
import { NextFunction, Response } from "express"
import { unlinkSync } from "fs"
import { ErrorMessage } from "../lib/messages"
import { IRequest } from "./../typings/interface/express"

/** Validation data
 * @param schema
 * @package joi
 */
export const validator = (schema: ObjectSchema) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
      if (req.file) {
        unlinkSync(req.file.path)
      }
      // Get message of error
      const message: string = error.details[0].message.replace(/(\")+/g, "")

      // Return error
      return res.status(422).json(new ErrorMessage("Invalid Data", message, 422))
    }
    if (!req.value) {
      req.value = {}
    }

    req.value.body = value
    next()
  }
}
