// import autoBind from "auto-bind"
import { Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "src/lib/messages"
import verificationCode from "./../../models/verificationCode"
import { process } from "./../../typings/enum/verificationCode"
import IUser from "./../../typings/interface/user"

export default abstract class BaseController {
    // constructor() {
    //     autoBind(this)
    // }

    /** Show error message
     * @param {object} error
     * @returns error
     */
    protected showErrorMessage(error: ErrorMessage) {
        throw error
    }

    /** Show success message
     * @param {response} res
     * @param {object} data
     * @returns {response} res.status(200).json({ message, status, properties })
     */
    protected showSuccessMessage(res: Response, data: PublicInfoMessage) {
        res.status(data.status).json(data)
    }

    /** Generate verification code
     * @param {date} expiryDate
     * @param {number} processAction
     * @param {string} user
     * @param {string} data
     */
    protected async generateVerificationCode(expiryDate: Date, processAction: process, user: IUser, data?: string) {
        return new verificationCode({
            data,
            expiryDate,
            process: processAction,
            user,
        }).save()
    }

}
