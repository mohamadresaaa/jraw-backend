import { NextFunction, Response } from "express"
import signInService from "../../services/v1/authentication/signInService"
import signUpService from "../../services/v1/authentication/signUpService"
import { IRequest } from "../../typings/interface/express"
import BaseController from "./baseController"

export default new class AuthenticateController extends BaseController {
    /** Sign up user
     * @return message
     */
    public async registration(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get email, username, password from req.body
             * and calling user sign up service
             * @param email
             * @param username
             * @param password
             */
            const result = await signUpService({ ...req.body })

            // Return message
            return this.infoMessage(res, result)
        } catch (error) {
            next(error)
        }
    }

    /** Sign in user
     * @returns message, user
     */
    public async login(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get email, password from req.body
             * and calling user login service
             * @param email
             * @param password
             * @return publicInfoMessage
             */
            const result = await signInService({ ...req.body })

            // Return message
            return this.infoMessage(res, result)
        } catch (error) {
            next(error)
        }
    }
}
