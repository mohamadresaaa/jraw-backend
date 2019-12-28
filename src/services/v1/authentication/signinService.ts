import userRepository from "../../../repositories/userRepository"
import { EStatus } from "../../../typings/enum/user"
import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"

export default async ({ email, password }: { email: string, password: string }): Promise<PublicInfoMessage> => {
    try {
        // Find user
        const user = await userRepository.single({ $or: [{ email }, { username: email }] })

        // If find user, handle it
        if (user) {
            // If user is inactive or block
            if (user.status === EStatus.inactive || user.status === EStatus.block) {
                throw new ErrorMessage("Account status",
                    user.status === EStatus.inactive ?
                        "Your account is disabled Please activate your account" :
                        "Your account has been blocked See support for reviewing your account",
                    403)
            }

            // If password is the same
            if (await user.comparePassword(password)) {
                // Generate jwt token and save to session, return message and user
                return new PublicInfoMessage("Sign in successfully completed",
                    200,
                    { token: await user.generateSession(), ...user.dataTransform() })
            }

            // Otherwise, handle it
            throw new ErrorMessage("Unauthorized user", "Incorrect email or password", 401)
        }

        // Otherwise, user is found return error
        throw ErrorMessage.errNotFound("User", "Incorrect email or password")
    } catch (error) {
        throw error
    }
}
