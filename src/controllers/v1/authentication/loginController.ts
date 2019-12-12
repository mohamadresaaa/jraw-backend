import { NextFunction, Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { IRequest } from "../../../typings/interface/express"
import IUser from "../../../typings/interface/user"
import BaseController from "../baseController"

export default new class LoginController extends BaseController {
    /** Sign in user
     * @param {string} email
     * @param {string} password
     * @returns message and user
     */
    async local(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get [email or username], password
            const { email, password } = req.body

            // Find user
            const user: IUser | null = await User.findOne({ $or: [{ email }, { username: email }] })

            // If find user, handle it
            if (user) {
                // If user is inactive or block

                // If enabled 2 factor auth

                    // send verification code

                // If password is the same

                    // Generate jwt token and save to session

                    // Return message and user

                // otherwise, handle it
            }

            // If not user is found
            this.showErrorMessage(new ErrorMessage("", "", 404))
        } catch (error) {
            next(error)
        }
    }
}
