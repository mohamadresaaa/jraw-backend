import { Response } from "express"
import { ErrorMessage, PublicErrorMessage, PublicInfoMessage } from "./../../lib/messages"
import VerificationCode from "./../../models/verificationCode"
import { EAction } from "./../../typings/enum/verificationCode"
import IUser from "./../../typings/interface/user"
import IVerificationCode from "./../../typings/interface/verificationCode"

export default abstract class BaseController {
    /** Show error message
     * @param name
     * @param message
     * @param status
     * @returns error
     */
    protected errorMessage({ name, message, status }: PublicErrorMessage) {
        throw new ErrorMessage(name, message, status)
    }

    /** Show success message
     * @param res
     * @param data
     * @returns res.status(200).json({ message, status, properties })
     */
    protected infoMessage(res: Response, { message, properties, status }: PublicInfoMessage) {
        res.status(status).json(new PublicInfoMessage(message, status, properties))
    }

    /** Generate verification code
     * @param expiryDate
     * @param processAction
     * @param user
     * @param data
     */
    protected async setVerificationCode(expiryDate: Date, action: EAction, user: IUser): Promise<IVerificationCode> {
        return new VerificationCode({ action, expiryDate, user }).save()
    }

    /** Get verification code
     * @param code
     * @param action
     */
    protected async getVerificationCode(action: EAction, code: string, user?: IUser): Promise<IVerificationCode|null> {
        return VerificationCode.findOne({ action, code, expiryDate: { $gt: new Date() }, used: false, user })
    }

}
