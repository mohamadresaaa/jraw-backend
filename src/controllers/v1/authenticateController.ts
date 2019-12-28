import { NextFunction, Response } from "express"
import signUpService from "../../services/v1/authentication/signUpService"
import { IRequest } from "../../typings/interface/express"
import BaseController from "./baseController"

export default new class AuthenticateController extends BaseController {
    /** Sign up user
     * @returns message
     */
    public async registration(req: IRequest, res: Response, next: NextFunction) {
        try {
            /** Get email, username, password from req.body
             * and calling user sign up Service
             * @param email
             * @param username
             * @param password
             */
            await signUpService({ ...req.body })

            // Return message
            return this.infoMessage(res, {
                message: "Your account was successfully registered. Please refer to your email for activation",
                status: 200,
            })
        } catch (error) {
            next(error)
        }
    }
}
