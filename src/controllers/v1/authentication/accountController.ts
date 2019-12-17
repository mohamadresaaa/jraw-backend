import { NextFunction, Response } from "express"
import { ErrorMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { EStatus } from "../../../typings/enum/user"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"
import { EAction } from "./../../../typings/enum/verificationCode"

export default new class AccountController extends BaseController {
    /** Activate account with verification code
     * @param code
     * @returns message
     */
    async activation(req: IRequest, res: Response, next: NextFunction) {
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

    /** deactivate account with verification code
     * @param code
     * @returns message
     */
    async deactivation(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get code
            const { code } = req.body

            // Find verification code
            const verifyCode = await this.getVerificationCode(EAction.accountDeactivation, code)

            // If find verification code, handle it
            if (verifyCode) {
                // Find user with id
                await User.findOneAndUpdate({ _id: verifyCode.user }, { status: EStatus.inactive })

                // Expire verification code
                await verifyCode.updateOne({ used: true })

                // Return message
                return this.infoMessage(res, {
                    message: "Your account has been successfully deactivated",
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
}
