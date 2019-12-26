import { NextFunction, Response } from "express"
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
            // Get [email or username], password
            const { email, password } = req.body

            // Find user
            const user: IUser | null = await User.findOne({ $or: [{ email }, { username: email }] })

            // If find user, handle it
            if (user) {
                // If user is inactive or block
                if (user.status === EStatus.inactive || user.status === EStatus.block) {
                    this.errorMessage({
                        message: user.status === EStatus.inactive ?
                            "Your account is disabled Please activate your account" :
                            "Your account has been blocked See support for reviewing your account",
                        name: "Account status",
                        status: 403,
                    })
                }
                // If enabled 2 factor auth

                // send verification code

                // If password is the same
                if (await user.comparePassword(password)) {
                    // Generate jwt token and save to session, return message and user
                    return this.infoMessage(res, {
                        message: "Sign in successfully completed",
                        properties: { token: await user.generateSession(), ...user.dataTransform() },
                        status: 200,
                    })
                }

                // otherwise, handle it
                this.errorMessage({
                    message: "Incorrect email or password",
                    name: "Unauthorized user",
                    status: 401,
                })
            }

            // If not user is found
            this.errorMessage(ErrorMessage.errNotFound("User",
                "Incorrect email or password"))
        } catch (error) {
            next(error)
        }
    }
}
