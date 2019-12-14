import { NextFunction, Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import User from "../../../models/user"
import { status } from "../../../typings/enum/user"
import { IRequest } from "../../../typings/interface/express"
import IUser from "../../../typings/interface/user"
import BaseController from "../baseController"

export default new class LoginController extends BaseController {
    /** Sign in user
     * @param email
     * @param password
     * @returns message and user
     */
    async local(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Get [email or username], password
            const { email, password } = req.body

            // Find user
            const user: IUser | null = await User.findOne({ $or: [{ email }, { username: email }] })

            // If find user, handle it
            if (user) {
                // If user is inactive or block
                if (user.status === status.inactive || user.status === status.block) {
                    this.showErrorMessage(new ErrorMessage(
                        "Account status",
                        user.status === status.inactive ?
                            "Your account is disabled Please activate your account" :
                            "Your account has been blocked See support for reviewing your account",
                        403))
                }
                // If enabled 2 factor auth

                    // send verification code

                // If password is the same
                if (await user.comparePassword(password)) {
                    // Generate jwt token and save to session, return message and user
                    return this.showSuccessMessage(res, new PublicInfoMessage("Sign in successfully completed", 200, {
                        user: await user.dataTransform(),
                    }))
                }

                // otherwise, handle it
                this.showErrorMessage(new ErrorMessage("Unauthorized user", "Incorrect email or password", 401))
            }

            // If not user is found
            this.showErrorMessage(new ErrorMessage("User not found", "Incorrect email or password", 404))
        } catch (error) {
            next(error)
        }
    }
}
