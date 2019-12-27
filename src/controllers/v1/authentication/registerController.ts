import { NextFunction, Response } from "express"
import userRepository from "../../../repositories/userRepository"
import signUpService from "../../../services/v1/authentication/signUpService"
import { EAction } from "../../../typings/enum/verificationCode"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"

export default new class RegisterController extends BaseController {
    /** Sign up user
     * @param email
     * @param username
     * @param password
     * @returns message
     */
    public async handle(req: IRequest, res: Response, next: NextFunction) {
        try {

            // Get email, username, password from req.body and calling User Registration Service
            await signUpService({ ...req.body })
            // const newUser = await userRepository.create({ ...req.body })

            // Create a verification code for account activation
            // const verificationCode = await this.setVerificationCode(
            //         new Date(new Date().setDate(new Date().getDate() + 1)),
            //         EAction.accountActivation,
            //         newUser.id)

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
