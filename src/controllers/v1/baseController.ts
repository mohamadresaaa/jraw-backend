import { Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "src/lib/messages"
import VerificationCode from "./../../models/verificationCode"
import { process } from "./../../typings/enum/verificationCode"
import IUser from "./../../typings/interface/user"
import IVerificationCode from "./../../typings/interface/verificationCode"

export default abstract class BaseController {
    /** Show error message
     * @param error
     * @returns error
     */
    protected showErrorMessage(error: ErrorMessage) {
        throw error
    }

    /** Show success message
     * @param res
     * @param data
     * @returns res.status(200).json({ message, status, properties })
     */
    protected showSuccessMessage(res: Response, data: PublicInfoMessage) {
        res.status(data.status).json(data)
    }

    /** Generate verification code
     * @param expiryDate
     * @param processAction
     * @param user
     * @param data
     */
    protected async generateVerificationCode(
        expiryDate: Date,
        processAction: process,
        user: IUser,
        data ?: string): Promise<IVerificationCode> {
            return new VerificationCode({
                data,
                expiryDate,
                process: processAction,
                user,
            }).save()
    }

    /** Get verification code
     * @param code
     * @param processAction
     * @param used
     */
    protected async getVerificationCode(
        code: string,
        processAction: process,
        used: boolean = false): Promise<IVerificationCode | null> {
            return VerificationCode.findOne({
                code,
                expiryDate: { $gt: new Date() },
                process: processAction,
                used,
            })
    }

}
