import { NextFunction, Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import User from "../../../models/user"
import VerificationCode from "../../../models/verificationCode"
import { status } from "../../../typings/enum/user"
import { IRequest } from "../../../typings/interface/express"
import IVerificationCode from "../../../typings/interface/verificationCode"
import BaseController from "../baseController"
import { process } from "./../../../typings/enum/verificationCode"

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
            const verifyCode: IVerificationCode | null = await VerificationCode.findOne({
                code,
                expiryDate: { $gt: new Date() },
                process: process.accountActivation,
                used: false,
            })

            // If find verification code, handle it
            if (verifyCode) {
                // Find user with id
                await User.findOneAndUpdate({ _id: verifyCode.user }, { status: status.active })

                // Expire verification code
                await verifyCode.updateOne({ used: true })

                // Return message
                return this.showSuccessMessage(res, new PublicInfoMessage(
                    "Your account has been successfully activated",
                    200))
            }

            // If not verification code is found Or verification code is expired
            this.showErrorMessage(new ErrorMessage("Invalid Data", "Verification code is incorrect", 400))
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
            const verifyCode: IVerificationCode | null = await VerificationCode.findOne({
                code,
                expiryDate: { $gt: new Date() },
                process: process.accountDeactivation,
                used: false,
            })

            // If find verification code, handle it
            if (verifyCode) {
                // Find user with id
                await User.findOneAndUpdate({ _id: verifyCode.user }, { status: status.inactive })

                // Expire verification code
                await verifyCode.updateOne({ used: true })

                // Return message
                return this.showSuccessMessage(res, new PublicInfoMessage(
                    "Your account has been successfully deactivated",
                    200))
            }

            // If not verification code is found Or verification code is expired
            this.showErrorMessage(new ErrorMessage("Invalid Data", "Verification code is incorrect", 400))
        } catch (error) {
            next(error)
        }
    }
}
