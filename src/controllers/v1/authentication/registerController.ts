import { NextFunction, Response } from "express"
import { PublicInfoMessage } from "../../../lib/messages"
import user from "../../../models/user"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"

export default new class RegisterController extends BaseController {
    /** Sign up user
     * @param {string} email
     * @param {string} username
     * @param {string} password
     * @returns message
     */
    async local(req: IRequest, res: Response, next: NextFunction) {
        try {
            // get email, username, password
            const { email, username, password } = req.body

            // create new user
            await new user({ email, username, password }).save()

            // return message
            this.showSuccessMessage(res, new PublicInfoMessage("Your account was successfully registered. Please refer to your email for activation", 200))
        } catch (error) {
            next(error)
        }
    }
}
