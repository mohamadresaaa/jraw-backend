import { NextFunction, Response } from "express"
import signinService from "src/services/v1/authentication/signInService"
import User from "../../../models/user"
import { EStatus } from "../../../typings/enum/user"
import { IRequest } from "../../../typings/interface/express"
import { IUser } from "../../../typings/interface/user"
import BaseController from "../baseController"
import { ErrorMessage } from "./../../../lib/messages"

export default new class LoginController extends BaseController {
    /** Sign in user
     * @param email
     * @param password
     * @returns message and user
     */
    public async local(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get email, password from req.body
             * and calling User login Service
             * @param email
             * @param password
             * return publicInfoMessage
             */
            const result = await signinService({ ...req.body })

            // Return message
            this.infoMessage(res, result)
        } catch (error) {
            next(error)
        }
    }
}
