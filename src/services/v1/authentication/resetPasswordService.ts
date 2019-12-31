import userRepository from "../../../repositories/userRepository"
import verificationCodeRepository from "../../../repositories/verificationCodeRepository"
import { EAction } from "../../../typings/enum/verificationCode"
import { ErrorMessage, PublicInfoMessage } from "./../../../lib/messages"

export default async ({ code, password }: { code: string, password: string }): Promise<PublicInfoMessage> => {
    try {
        // Find verification code
        const verifyCode = await verificationCodeRepository.single({
            action: EAction.passwordRecovery,
            code,
            expiryDate: { $gt: new Date() },
            used: false,
        })

        // If find verification code, handle it
        if (verifyCode) {
            // Find user with id and update password
            const user = await userRepository.single({ id: verifyCode.user })

            // If exists user, handle it
            if (user) {
                await user.set({ password }).save()

                // Remove sessions of user
                // await Session.deleteMany({ user: user.id })
            }

            // Expire verification code
            await verifyCode.updateOne({ used: true })

            // Return message
            return new PublicInfoMessage("Your password has been successfully retrieved",
                200)
        }

        // Otherwise, return error
        throw new ErrorMessage("Invalid verification code",
            "Verification code is incorrect",
            422)
    } catch (error) {
        throw error
    }
}
