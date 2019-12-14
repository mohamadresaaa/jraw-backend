import { NextFunction, Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { process } from "../../../typings/enum/verificationCode"
import { IRequest } from "../../../typings/interface/express"
import IUser from "../../../typings/interface/user"
import BaseController from "../baseController"

export default new class PasswordController extends BaseController {
    /** Send password recovery link to user email
     * @param email
     * @returns message
     */
    async forgotPassword(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get email
            const { email } = req.body

            // Get email and find user with email
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

    /** Update and password recovery
     * @param code
     * @param password
     * @returns message
     */
    async resetPassword(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get code, password
            const { code, password } = req.body

            // Find verification code
            const verifyCode = await this.getVerificationCode(code, process.passwordRecovery)

            if (verifyCode) {
                // Find user with id and update password
                await User.findOneAndUpdate({ _id: verifyCode.user }, { password })

                // Expire verification code
                await verifyCode.updateOne({ used: true })

                // Return message
                return this.showSuccessMessage(res, new PublicInfoMessage(
                    "Your password has been successfully retrieved",
                    200))
            }

            // If not verification code is found Or verification code is expired
            this.showErrorMessage(new ErrorMessage("Invalid Data", "Verification code is incorrect", 400))
        } catch (error) {
            next(error)
        }
    }
}
