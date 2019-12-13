import { NextFunction, Response } from "express"
import { PublicInfoMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { process } from "../../../typings/enum/verificationCode"
import { IRequest } from "../../../typings/interface/express"
import IUser from "../../../typings/interface/user"
import BaseController from "../baseController"

export default new class PasswordController extends BaseController {
    async forgotPassword(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get email
            const { email } = req.body

            // Find user with email
            const user: IUser | null = await User.findOne({ email })

            // If find user
            if (user) {
                // Create a verification code for password recovery
                const verificationCode = await this.generateVerificationCode(
                    new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
                    process.passwordRecovery,
                    user.id)

                // Send email
            }

            // Return message
            return this.showSuccessMessage(res, new PublicInfoMessage(
                "Password recovery link was sent to your email",
                200))
        } catch (error) {
            next(error)
        }
    }

    async resetPassword(req: IRequest, res: Response, next: NextFunction) {
        this.showSuccessMessage(res, new PublicInfoMessage("password controller: resetPassword", 200))
    }
}
