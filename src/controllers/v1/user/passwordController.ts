import BaseController from "../baseController"

// types
import { NextFunction, Response } from "express"
import { IRequest } from "../../../typings/interface/express"

// services
import passwordChangeService from "../../../services/v1/password/passwordChangeService"
import passwordRecoveryService from "../../../services/v1/password/passwordRecoveryService"
import resetPasswordService from "../../../services/v1/password/resetPasswordService"

export default new class PasswordController extends BaseController {
    /** Send password recovery link to email
     * @return message
     */
    public async recovery(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get email from req.body
             * and calling password recovery service
             * @param email
             * @return publicInfoMessage
             */
            const result = await passwordRecoveryService({ ...req.body })

            // Return message
            return this.infoMessage(res, result)
        } catch (error) {
            next(error)
        }
    }

    /** Reset password user and remove sessions of user
     * @return message
     */
    public async reset(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get code, password from req.body
             * and calling reset password service
             * @param code
             * @param password
             * @return publicInfoMessage
             */
            const result = await resetPasswordService({ ...req.body })

            // Return message
            return this.infoMessage(res, result)
        } catch (error) {
            next(error)
        }
    }

    /** Change user password and remove sessions of user
     * @return message
     */
    public async update(req: IRequest, res: Response, next: NextFunction) {
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
                const result = await passwordChangeService(req.user, { ...req.body })

                // Return message
                return this.infoMessage(res, result)
            }

            this.errorMessage({
                message: "Authentication failed",
                name: "Unauthorized",
                status: 401,
            })
        } catch (error) {
            next(error)
        }
    }
}
