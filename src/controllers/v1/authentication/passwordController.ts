import { NextFunction, Response } from "express"
import { ErrorMessage } from "../../../lib/messages"
import Session from "../../../models/session"
import User from "../../../models/user"
import { EAction } from "../../../typings/enum/verificationCode"
import { IRequest } from "../../../typings/interface/express"
import { IUser } from "../../../typings/interface/user"
import BaseController from "../baseController"

export default new class PasswordController extends BaseController {
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
