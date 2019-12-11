import { NextFunction, Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import user from "../../../models/user"
import verificationCode from "../../../models/verificationCode"
import { status } from "../../../typings/enum/user"
import { IRequest } from "../../../typings/interface/express"
import IVerificationCode from "../../../typings/interface/verificationCode"
import BaseController from "../baseController"

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
            const verifyCode: IVerificationCode | null = await verificationCode.findOne({ code })

            // If find verification code, handle it
            if (verifyCode) {
                // If verification code is not valid
                if (verifyCode.isExpired()) {
                    this.showErrorMessage(new ErrorMessage(
                        "Expired verification code",
                        "Verification code has expired",
                        400))
                }

                // Find user with id
                await user.findOneAndUpdate({ _id: verifyCode.user }, { status: status.enable })

                // Return message
                return this.showSuccessMessage(res, new PublicInfoMessage(
                    "Your account has been successfully activated",
                    200))
            }

            // If no verification code is found
            this.showErrorMessage(new ErrorMessage("Invalid Data", "Verification code is incorrect", 422))
        } catch (error) {
            next(error)
        }
    }

    async deactivation(req: IRequest, res: Response, next: NextFunction) {
        this.showSuccessMessage(res, new PublicInfoMessage("account controller: deactivation", 200))
    }
}
