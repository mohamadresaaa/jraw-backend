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
            // Get email, username, password
            const { email, username, password } = req.body

            // Create user
            const newUser = await this.generateUser({ email, username, password })

            // Create a verification code for account activation
            await this.generateVerificationCode(
                    new Date(new Date().setDate(new Date().getDate() + 1)),
                    process.accountActivation,
                    newUser.id)

            // Return message
            return this.showSuccessMessage(res, new PublicInfoMessage("Your account was successfully registered. Please refer to your email for activation", 200))
        } catch (error) {
            next(error)
        }
    }

    /** Generate a new user with email, password and username
     * @param data
     * @returns user
     */
    private async generateUser(data: { email: string, password: string, username: string }) {
        return new User({ ...data }).save()
    }
}
