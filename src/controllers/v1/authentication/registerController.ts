import { NextFunction, Response } from "express"
import { PublicInfoMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { process } from "../../../typings/enum/verificationCode"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"

export default new class RegisterController extends BaseController {
    /** Sign up user
     * @param email
     * @param username
     * @param password
     * @returns message
     */
    public async local(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get email, username, password from req.body and create user
            const newUser = await new User({ ...req.body }).save()

            // Create a verification code for account activation
            const verificationCode = await this.generateVerificationCode(
                    new Date(new Date().setDate(new Date().getDate() + 1)),
                    process.accountActivation,
                    newUser.id)

            // Return message
            return this.showSuccessMessage(res, new PublicInfoMessage("Your account was successfully registered. Please refer to your email for activation", 200))
        } catch (error) {
            next(error)
        }
    }
}
