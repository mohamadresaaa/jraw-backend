import { NextFunction, Response } from "express"
import { ErrorMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { EStatus } from "../../../typings/enum/user"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"
import accountDeactivationService from "./../../../services/v1/account/accountDeactivationService"
import changePasswordService from "./../../../services/v1/account/changePasswordService"
import { EAction } from "./../../../typings/enum/verificationCode"

export default new class AccountController extends BaseController {
    /** Activate account with verification code
     * @param code
     * @returns message
     */
    public async activation(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get code
            const { code } = req.body

            // Find verification code
            const verifyCode = await this.getVerificationCode(EAction.accountActivation, code)

            // If find verification code, handle it
            if (verifyCode) {
                // Find user with id
                await User.findOneAndUpdate({ _id: verifyCode.user }, { status: EStatus.active })

                // Expire verification code
                await verifyCode.updateOne({ used: true })

                // Return message
                return this.infoMessage(res, {
                    message: "Your account has been successfully activated",
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

    /** Change username */
    public async updateUsername(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get username
            const { username } = req.body

            // Set and change username
            await req.user?.set({ username }).save()

            // Return message
            return this.infoMessage(res, {
                message: "Your username has been successfully changed",
                status: 200,
            })
        } catch (error) {
            next(error)
        }
    }

    /** Get current user information */
    public async currentUser(req: IRequest, res: Response, next: NextFunction) {
        try {
            return res.json(req.user?.dataTransform())
        } catch (error) {
            next(error)
        }
    }

    /** Deactivate account with verification code
     * @return message
     */
    public async deactivation(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get code from req.body
             *  calling account deactivation service
             * @param code
             * @return publicInfoMessage
             */
            const result = await accountDeactivationService({ ...req.body })

            // Return message
            return this.infoMessage(res, result)
        } catch (error) {
            next(error)
        }
    }

    /** Change user password and remove sessions of user
     * @return message
     */
    public async updatePassword(req: IRequest, res: Response, next: NextFunction) {
        try {
            if (req.user) {
                /** Get oldPassword, newPassword from req.body
                 *  and get current user in req.user,
                 *  calling change password service
                 * @param user
                 * @param oldPassword
                 * @param newPassword
                 * @return publicInfoMessage
                 */
                const result = await changePasswordService(req.user, { ...req.body })

                // Return message
                return this.infoMessage(res, result)
            }

            throw new ErrorMessage("Unauthorized", "Authentication failed", 401)
        } catch (error) {
            next(error)
        }
    }
}
