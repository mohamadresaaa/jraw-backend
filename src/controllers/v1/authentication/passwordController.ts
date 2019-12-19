import { NextFunction, Response } from "express"
import { ErrorMessage } from "../../../lib/messages"
import Session from "../../../models/session"
import User from "../../../models/user"
import { EAction } from "../../../typings/enum/verificationCode"
import { IRequest } from "../../../typings/interface/express"
import IUser from "../../../typings/interface/user"
import BaseController from "../baseController"

export default new class PasswordController extends BaseController {
    /** Send password recovery link to user email
     * @param email
     * @returns message
     */
    public async forgot(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get email
            const { email } = req.body

            // Get email and find user with email
            const user: IUser | null = await User.findOne({ email })

            // If find user
            if (user) {
                // Create a verification code for password recovery
                const verificationCode = await this.setVerificationCode(
                    new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
                    EAction.passwordRecovery,
                    user.id)

                // Send email
            }

            // Return message
            return this.infoMessage(res, {
                message: "Password recovery link was sent to your email",
                status: 200,
            })
        } catch (error) {
            next(error)
        }
    }

    /** Password recovery and remove sessions of user
     * @param code
     * @param password
     * @returns message
     */
    public async reset(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get code, password
            const { code, password } = req.body

            // Find verification code
            const verifyCode = await this.getVerificationCode(EAction.passwordRecovery, code)

            if (verifyCode) {
                // Find user with id and update password
                const user = await User.findById(verifyCode.user)

                // If exists user, handle it
                if (user) {
                    await user.set({ password }).save()

                    // Remove sessions of user
                    await Session.deleteMany({ user: user.id })
                }

                // Expire verification code
                await verifyCode.updateOne({ used: true })

                // Return message
                return this.infoMessage(res, {
                    message: "Your password has been successfully retrieved",
                    status: 200,
                })
            }

            // If not verification code is found Or verification code is expired
            this.errorMessage(ErrorMessage.errNotFound("Verification code",
                "Verification code is incorrect"))
        } catch (error) {
            next(error)
        }
    }

    /** Change user password and remove sessions of user
     * @param oldPassword
     * @param newPassword
     * @returns message
     */
    public async update(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get oldPassword and newPassword
            const { oldPassword, newPassword } = req.body

            // If password is the same
            if (req.user?.comparePassword(oldPassword)) {
                // Update password
                await req.user.set({ password: newPassword }).save()

                // Remove sessions of user
                await Session.deleteMany({ user: req.user.id })

                // Return message
                return this.infoMessage(res, {
                    message: "Your password has been successfully changed",
                    status: 200,
                })
            }

            // Otherwise
            this.errorMessage({
                message: "Old password is incorrect",
                name: "Invalid Data",
                status: 422,
            })
        } catch (error) {
            next(error)
        }
    }
}
