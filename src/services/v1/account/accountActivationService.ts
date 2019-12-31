import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import userRepository from "../../../repositories/userRepository"
import verificationCodeRepository from "../../../repositories/verificationCodeRepository"
import { EStatus } from "../../../typings/enum/user"
import { EAction } from "../../../typings/enum/verificationCode"

export default async ({ code }: { code: string }): Promise<PublicInfoMessage> => {
    try {
        // Find verification code
        const verifyCode = await verificationCodeRepository.single({
            action: EAction.accountActivation,
            code,
            expiryDate: { $gt: new Date() },
            used: false,
        })

        // If exists verification code
        if (verifyCode) {
            // Find user with id
            await userRepository.update({ id: verifyCode.user },
                { status: EStatus.active })

            // Expire verification code
            await verifyCode.updateOne({ used: true })

            // Return message
            return new PublicInfoMessage("Your account has been successfully activated",
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
